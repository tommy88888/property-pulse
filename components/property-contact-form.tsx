'use client';

import message from '@/models/message';
import Property from '@/models/Property';

import { useSession } from 'next-auth/react';
import { useReducer, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

type PropertyContactFormProps = {
  property: Property;
};

export interface UserProfile {
  name: string;
  email: string;
  message: string;
  phone: string;
  wasSubmitted: boolean;
}

// Initial State
const initialState: UserProfile = {
  name: '',
  email: '',
  message: '',
  phone: '',
  wasSubmitted: false,
};

// Action Types
enum ActionTypes {
  SET_NAME = 'SET_NAME',
  SET_EMAIL = 'SET_EMAIL',
  SET_MESSAGE = 'SET_MESSAGE',
  SET_PHONE = 'SET_PHONE',
  SET_WAS_SUBMITTED = 'SET_WAS_SUBMITTED',
  SET_CLEAR = 'SET_CLEAR',
}

// Reducer Function
function reducer(
  state: UserProfile,
  action: { type: ActionTypes; payload: any }
) {
  switch (action.type) {
    case ActionTypes.SET_NAME:
      return { ...state, name: action.payload };
    case ActionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case ActionTypes.SET_MESSAGE:
      return { ...state, message: action.payload };
    case ActionTypes.SET_PHONE:
      return { ...state, phone: action.payload };
    case ActionTypes.SET_WAS_SUBMITTED:
      return { ...state, wasSubmitted: action.payload };
    case ActionTypes.SET_CLEAR:
      return { ...state, setClear: action.payload };
    default:
      return state;
  }
}

const PropertyContactForm = ({ property }: PropertyContactFormProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, email, message, phone, wasSubmitted } = state;

  const { data: session } = useSession();

  // Handle Input Changes
  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: React.ChangeEvent<T>
  ): void => {
    const { name, value, defaultValue, type } = e.target;
    if (e.target instanceof HTMLInputElement && type === 'text') {
      // console.log('Input value:', name, value);
      dispatch({
        type: ActionTypes.SET_NAME,
        payload: value,
      });
    } else if (e.target instanceof HTMLTextAreaElement && type === 'textarea') {
      // console.log('TextArea value:', value);
      dispatch({
        type: ActionTypes.SET_MESSAGE,
        payload: value,
      });
    } else if (e.target instanceof HTMLInputElement && type === 'email') {
      dispatch({ type: ActionTypes.SET_EMAIL, payload: value });
    } else if (e.target instanceof HTMLInputElement && type === 'tel') {
      dispatch({ type: ActionTypes.SET_PHONE, payload: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      email,
      message,
      phone,
      recipient: property.owner,
      property: property._id,
    };
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        toast.success('Message sent successfully');
        dispatch({ type: ActionTypes.SET_WAS_SUBMITTED, payload: true });
      } else if (res.status === 400) {
        toast.error(data.message);
      } else if (res.status === 400 || res.status === 401) {
        const dataObj = await res.json();
        toast.error(dataObj.message);
      } else {
        toast.error('Error sending form');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error sending form');
    } finally {
      dispatch({ type: ActionTypes.SET_CLEAR, payload: initialState });
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
      {!session ? (
        <p>You must be logged in to send a message</p>
      ) : wasSubmitted ? (
        <p className='text-emerald-500 mb-4 '>
          Your message has been sent successfully
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='name'
            >
              Name:{name}
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              type='text'
              placeholder='Enter your name'
              defaultValue={name}
              name='name'
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email:{email}
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Enter your email'
              defaultValue={email}
              name='email'
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='phone'
            >
              Phone:{phone}
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='phone'
              type='tel'
              placeholder='Enter your phone number'
              defaultValue={phone}
              name='phone'
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='message'
            >
              Message:{message}
            </label>
            <textarea
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
              id='message'
              name='message'
              placeholder='Enter your message'
              onChange={handleChange}
              defaultValue={message}
            />
          </div>
          <div>
            <button
              className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
              type='submit'
            >
              <FaPaperPlane className='mr-2' /> Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PropertyContactForm;
