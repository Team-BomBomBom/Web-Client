'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Hls from 'hls.js';
import { Maximize2, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button } from '../button/button';
import { Slider } from '../slider/slider';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  description: string;
  uploaderName: string;
  uploaderAvatar: string;
  views: number;
  uploadDate: string;
}
export default function VideoPlayer({
  src,
  poster,
  title,
  description,
  uploaderName,
  uploaderAvatar,
  views,
  uploadDate
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    console.log('cookie:', cookies);

    if (Hls.isSupported()) {
      // This will run in all other modern browsers
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    }
    setDuration(video.duration);

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(isFinite(progress) ? progress : 0);
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateDuration);
    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [src, videoRef]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (newProgress: number[]) => {
    if (videoRef.current && duration > 0) {
      const newTime = (newProgress[0] / 100) * duration;
      if (isFinite(newTime)) {
        try {
          videoRef.current.currentTime = newTime;
          setProgress(newProgress[0]);
        } catch (error) {
          console.error('Error setting currentTime:', error);
        }
      }
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    if (videoRef.current) {
      const volumeValue = newVolume[0];
      if (isFinite(volumeValue) && volumeValue >= 0 && volumeValue <= 1) {
        videoRef.current.volume = volumeValue;
        setVolume(volumeValue);
        setIsMuted(volumeValue === 0);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (newMutedState) {
        setVolume(videoRef.current.volume);
        videoRef.current.volume = 0;
      } else {
        videoRef.current.volume = volume;
      }
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <>
      <div className="relative w-full max-w-4xl mx-auto">
        <video
          ref={videoRef}
          className="w-full rounded-lg shadow-lg"
          poster={poster}
        >
          <source src={src}></source>
        </video>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white hover:text-white hover:bg-white/20"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm">
                {formatTime(videoRef.current?.currentTime || 0)} /{' '}
                {formatTime(duration)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-white hover:text-white hover:bg-white/20"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </Button>
              <Slider
                className="w-24"
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                aria-label="Volume"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-white hover:text-white hover:bg-white/20"
                aria-label="Toggle fullscreen"
              >
                <Maximize2 className="h-6 w-6" />
              </Button>
            </div>
          </div>
          <Slider
            value={[progress]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={handleProgressChange}
            aria-label="Video progress"
            className="mt-2"
          />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>{uploaderName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{uploaderName}</p>
              <p className="text-sm text-gray-500">
                {views.toLocaleString()} views • {uploadDate}
              </p>
            </div>
          </div>
        </div>
        <p className="text-gray-700">{description}</p>
      </div>
    </>
  );
}
