import { OptionsType } from '@/type';
import { create } from 'zustand';

type SearchState = {
  location: string;
  propertyType: OptionsType | 'All';
  searchText: string;
  setLocation: (location: string) => void;
  setPropertyType: (type: OptionsType | 'All') => void;
  setSearchText: (text: string) => void;
};

const initialState: SearchState = {
  location: '',
  propertyType: 'All',
  searchText: '',
  setLocation: function (location: string): void {
    throw new Error('Function not implemented.');
  },
  setPropertyType: function (type: OptionsType | 'All'): void {
    throw new Error('Function not implemented.');
  },
  setSearchText: function (text: string): void {
    throw new Error('Function not implemented.');
  },
};

export const useSearchStore = create<SearchState>((set) => ({
  ...initialState,
  setLocation: (location: string) => set({ location }),
  setPropertyType: (type: OptionsType | 'All') => set({ propertyType: type }),
  setSearchText: (text: string) => set({ searchText: text }),
}));
