import {
  MAX_CAPACITY,
  MAX_DIFFICULTY_LEVEL,
  MAX_LENGTH_INTRODUCE,
  MAX_LENGTH_NAME,
  MAX_PENALTY,
  MAX_PROBLEM_COUNT,
  MAX_RELIABILITY_LIMIT,
  MAX_WEEKS,
  StudyType
} from '@/constants/study/study';
import { RawCreateParams, z } from 'zod';
import { User } from '../user/user';

export interface RegisterStudyReq {
  name: string;
  introduce: string;
  capacity: number;
  weeks: number;
  startDate: string;
  reliabilityLimit: number;
  penalty: number;
}

export interface RegisterAlgorithmStudyReq extends RegisterStudyReq {
  difficultyBegin: number;

  difficultyEnd: number;

  problemCount: number;
}

export interface RegisterBookStudyReq extends RegisterStudyReq {
  isbn: number;
}
const registerStudyShared = z.object({
  name: z
    .string()
    .trim()
    .min(1, '필수입니다.')
    .max(MAX_LENGTH_NAME, `${MAX_LENGTH_NAME}자 이내로 작성해주세요.`),
  introduce: z
    .string()
    .trim()
    .min(1, '필수입니다.')
    .max(
      MAX_LENGTH_INTRODUCE,
      `${MAX_LENGTH_INTRODUCE}자 이내로 작성해주세요.`
    ),
  startDate: z
    .date({
      invalid_type_error: '필수입니다.'
    })
    .default(new Date()),
  weeks: z
    .number({
      invalid_type_error: '필수입니다'
    })
    .min(1, '1 이상이여야 합니다.')
    .max(52, `${MAX_WEEKS} 이하여야 합니다.`),
  penalty: z
    .number({
      invalid_type_error: '필수입니다'
    })
    .min(0, '0 이상이여야 합니다.')
    .max(MAX_PENALTY, `${MAX_PENALTY} 이하여야 합니다.`),

  capacity: z
    .number({
      invalid_type_error: '필수입니다'
    })
    .min(1, '1 이상이여야 합니다.')
    .max(MAX_CAPACITY, `${MAX_CAPACITY} 이하여야 합니다.`),
  studyType: z.string(),
  reliabilityLimit: z
    .number({
      invalid_type_error: '필수입니다'
    })
    .min(0, '0 이상이여야 합니다.')
    .max(MAX_RELIABILITY_LIMIT, `${MAX_RELIABILITY_LIMIT} 이하여야 합니다.`)
});

function getSharedRefine(user: User) {
  return (schema: z.ZodTypeAny) =>
    schema
      .refine(({ weeks, penalty }) => penalty * weeks <= user.money, {
        message: '벌금 × 총 주차수는 보유한 잔액 이하여야 합니다.',
        path: ['penalty']
      })
      .refine(({ reliabilityLimit }) => reliabilityLimit <= user.reliability, {
        message: '본인의 신뢰도 이하여야 합니다.',
        path: ['reliabilityLimit']
      });
}

export function getStudySchema(user: User) {
  return zDiscriminatedUnion(
    'studyType',
    [
      registerStudyShared
        .extend({
          studyType: z.literal(StudyType.ALGORITHM),
          difficultyBegin: z
            .number()
            .min(0, '0 이상이여야 합니다')
            .max(
              MAX_DIFFICULTY_LEVEL,
              `${MAX_DIFFICULTY_LEVEL} 이하여야 합니다.`
            )
            .default(0),
          difficultyEnd: z
            .number()
            .min(0, '0 이상이여야 합니다')
            .max(
              MAX_DIFFICULTY_LEVEL,
              `${MAX_DIFFICULTY_LEVEL} 이하여야 합니다.`
            )
            .default(MAX_DIFFICULTY_LEVEL),
          problemCount: z
            .number({
              invalid_type_error: '필수입니다.'
            })
            .min(1, '1 이상이여야 합니다.')
            .max(MAX_PROBLEM_COUNT, `${MAX_PROBLEM_COUNT} 이하여야 합니다.`)
        })
        .refine(
          ({ difficultyBegin, difficultyEnd }) =>
            difficultyBegin <= difficultyEnd,
          {
            message: '난이도 범위가 잘못되었습니다.',
            path: ['difficultyLevel']
          }
        ),
      registerStudyShared.extend({
        studyType: z.literal(StudyType.BOOK),
        isbn: z.number({
          required_error: '필수입니다.'
        })
      })
    ],
    {
      errorMap: (issue, ctx) => {
        if (issue.code === 'invalid_union_discriminator')
          return {
            message: '필수입니다.'
          };
        return { message: ctx.defaultError };
      }
    },
    getSharedRefine(user)
  );
}
function zDiscriminatedUnion<
  T extends readonly [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]]
>(
  key: string,
  types: T,
  params?: RawCreateParams,
  sharedRefine?: (arg0: z.ZodTypeAny) => z.ZodTypeAny
): z.ZodUnion<T>;
function zDiscriminatedUnion(
  key: string,
  types: z.ZodTypeAny[],
  params?: RawCreateParams,
  sharedRefine?: (arg0: z.ZodTypeAny) => z.ZodTypeAny
): any {
  const optionsMap = new Map();

  if (sharedRefine) {
    types = types.map(sharedRefine);
  }

  for (const type of types) {
    const discriminator = (
      type instanceof z.ZodEffects ? type.sourceType() : type
    ).shape[key];
    if (
      !(discriminator instanceof z.ZodLiteral) ||
      optionsMap.has(discriminator.value)
    ) {
      throw new Error('cannot contruct discriminated union');
    }
    optionsMap.set(discriminator.value, type);
  }
  return new z.ZodDiscriminatedUnion({
    typeName: z.ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
    discriminator: key,
    options: types as any,
    optionsMap,
    ...params
  });
}
