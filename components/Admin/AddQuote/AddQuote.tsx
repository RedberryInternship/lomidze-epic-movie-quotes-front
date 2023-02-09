import { Pencil } from 'components/icons';
import { FC } from 'react';
import { Props } from 'types';
import { AddQuoteModal } from './AddQuoteModal';
import { useAddQuote } from './useAddQuote';

const AddQuote: FC<Props> = ({ className }) => {
  const { isActive } = useAddQuote();
  return (
    <div
      className={`px-4 py-3 bg-app-bg bg-opacity-[.6] rounded-lg ${className}`}
    >
      {isActive('add-quote') && <AddQuoteModal />}
      <div className='flex gap-4 items-center'>
        <Pencil />
        <p>Write a new quote</p>
      </div>
    </div>
  );
};

export default AddQuote;