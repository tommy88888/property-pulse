'use client';

import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

type InputImagesProps = {};

const InputImages = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFileOne, setSelectedFileOne] = useState<File | null>(null);
  const [selectedFileTwo, setSelectedFileTwo] = useState<File>();
  const [selectedFileThree, setSelectedFileThree] = useState<File>();
  const [selectedFileFour, setSelectedFileFour] = useState<File>();
  const [tempFiles, setTempFiles] = useState<File[]>([]);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const handleSelectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event === undefined) return;
    // Convert file input result to an array and store it in state
    const newFiles = Array.from(event.target.files as FileList);
    // setSelectedFiles(Array.from(event.target.files as FileList));
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };
  const handleTempFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e === undefined) return;

    const newFile = e.target.files as any;
    setSelectedFileOne(newFile);
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   if (e.target && e.target.result) {
    //     const imageURL = e.target.result as any;
    //     setSelectedFileOne(imageURL);
    //   }
    // };
  };

  const remove = (i: number) => {
    // let fileBuffer = new DataTransfer();
    // if (selectedFiles.length < 0) return;
    // for (let idx = 0; idx < selectedFiles.length; idx++) {
    //   const selectedFile = selectedFiles[i];
    //   if (i !== idx) fileBuffer.items.add(selectedFiles[idx]);
    //   if (fileRef.current?.files === undefined || !fileRef.current?.files)
    //     return;
    //   let { files } = fileRef?.current;

    //   files = fileBuffer.files;
    //   if (!files) return;

    // }

    setSelectedFiles((prev) => prev.filter((file, index) => index !== i));
  };
  // if (selectedFiles.length <= 0) return [];

  return (
    <div>
      <ul>
        <li>
          temp file 1
          {selectedFileOne && (
            <Image
              // src={selectedFileOne}
              alt='temp1'
              width={1800}
              height={400}
              sizes='100vw'
              className='object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5'
              src={''}
            />
          )}
          <input
            type='file'
            name='img1'
            id='temp-files1'
            placeholder='temporary input files'
            onChange={handleTempFiles}
          />
        </li>
        <li>
          temp file 2
          {selectedFileTwo && (
            <Image
              // src={selectedFileOne}
              alt='temp2'
              width={1800}
              height={400}
              sizes='100vw'
              className='object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5'
              src={''}
            />
          )}
          <input
            type='file'
            name='img2'
            id='temp-files2'
            placeholder='temporary input files'
            onChange={handleTempFiles}
          />
        </li>
        <li>
          temp file 3
          <input
            type='file'
            name='img3'
            id='temp-files3'
            placeholder='temporary input files'
            onChange={handleTempFiles}
          />
        </li>
        <li>
          temp file 4
          <input
            type='file'
            name='img4'
            id='temp-files4'
            placeholder='temporary input files'
            onChange={handleTempFiles}
          />
        </li>
      </ul>
      {/* <input
        ref={fileRef}
        type='file'
        name='file'
        id='file-upload'
        multiple
        onChange={handleSelectedFile}
      /> */}
      <p>
        <b>{selectedFiles.length} file(s) selected</b>
      </p>
      {selectedFiles?.map((file, i) => (
        <div key={file.name} className='flex flex-col '>
          <Button
            variant='ghost'
            size='sm'
            key={file.name}
            type='button'
            onClick={() => remove(i)}
          >
            {file.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default InputImages;
