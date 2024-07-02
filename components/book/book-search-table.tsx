import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table/table';
import { BookSearchTableProps } from '@/types/book/book-result';

export default function BookSearchTable({
  books,
  setOpen,
  setBookInfo,
  initStates
}: BookSearchTableProps) {
  const handleTableRowClick = (title: string, isbn: number) => {
    setBookInfo({ title, isbn });
    initStates();
    setOpen(false);
  };

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>이미지</TableHead>
          <TableHead>서적명</TableHead>
          <TableHead>작가</TableHead>
          <TableHead>출판사</TableHead>
          <TableHead>ISBN</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map(({ imageUrl, title, author, publisher, isbn }) => (
          <TableRow
            key={isbn}
            onClick={() => handleTableRowClick(title, isbn)}
            className="cursor-pointer"
          >
            <TableCell>
              <div className="flex items-center justify-center w-24 h-24">
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain"
                  alt="cover"
                />
              </div>
            </TableCell>
            <TableCell>{title}</TableCell>
            <TableCell className="w-40 whitespace-normal">{author}</TableCell>
            <TableCell>{publisher}</TableCell>
            <TableCell>{isbn}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
