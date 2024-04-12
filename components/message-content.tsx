'use client';

import { cn } from '@/lib/utils';
import Message from '@/models/message';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { useGlobalContext } from '@/context/global-context';

interface MessageProps {
  message: Message;
}

const MessageContent = ({ message }: MessageProps) => {
  const [isRead, setIsRead] = useState(message.read);
  const [deleted, setDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  if (!message || message === undefined) return;
  const {
    body,
    email,
    name,
    phone,
    property,
    recipient,
    sender,
    read,
    createdAt,
  } = message;

  if (!property) return;
  const { name: propertyName } = property as any;

  if (!sender) return;
  const { username } = sender as any;

  const handleRead = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prev) => (read ? prev - 1 : prev + 1));
        if (read) {
          toast.success('Mark as read');
        } else {
          toast.success('Mark as New');
        }
      }
    } catch (err) {
      console.log(err);
      toast.error('Something Went Wrong');
    }
  };

  const handleRemove = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        setDeleted(true);
        setUnreadCount((prev) => prev - 1);
        toast.success('Message Deleted');
      }
    } catch (err) {
      console.log(err);
      toast.error('Deleted Failed');
    }
  };

  if (deleted) return null;

  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      {!isRead && (
        <div className='absolute text-xs top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md '>
          New
        </div>
      )}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry:</span>
        {propertyName}
      </h2>
      <p className='text-gray-700'>{body}</p>
      <ul className='mt-4'>
        <li>
          <strong>Name: </strong>
          {message.sender && username}
        </li>
        <li>
          <strong>Reply Email:</strong>
          <a href={`mailto:${email}`} className='text-blue-500'>
            {email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${phone}`} className='text-blue-500'>
            {phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>
          {new Date(createdAt).toLocaleString()}
        </li>
      </ul>
      <Button
        onClick={handleRead}
        variant={isRead ? 'ghost' : 'primary'}
        size='xs'
        className={cn(
          'mt-4 mr-3 text-xs  py-1 px-3 rounded-md cursor-pointer align-middle',
          isRead ? 'bg-gray-300' : 'bg-sky-500 text-white'
        )}
      >
        {isRead ? 'Mark as New' : 'Mark As Read'}
      </Button>
      <Button
        onClick={handleRemove}
        variant='destructive'
        size='xs'
        className='mt-4 text-xs bg-red-500 text-white py-1 px-3 rounded-md align-middle'
      >
        Delete
      </Button>
    </div>
  );
};

export default MessageContent;
