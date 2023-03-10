import { Bin, Dots, Eye, Pen, Select } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { QuoteMenuProps } from './type';
import { useQuoteMenu } from './useQuoteMenu';

const QuoteMenu: FC<QuoteMenuProps> = ({ quote, id, handleDelete }) => {
  const { setQuoteHandler, t } = useQuoteMenu();
  return (
    <>
      <Select face={<Dots />}>
        <div
          className='absolute right-8 bottom-4 xl:right-0 xl:bottom-auto z-10'
          onClick={() => setQuoteHandler(quote)}
        >
          <ul className='flex flex-col gap-8 bg-[#24222F] px-10 py-8 rounded-ten lg:w-[15rem] text-base'>
            <li>
              <Link href={`${id}?view-quote`}>
                <div className='flex items-center gap-4'>
                  <Eye big />
                  {t('viewQuote')}
                </div>
              </Link>
            </li>
            <li className='flex items-center gap-4 cursor-pointer'>
              <Link href={`${id}?edit-quote`}>
                <div className='flex items-center gap-4'>
                  <Pen />
                  {t('edit')}
                </div>
              </Link>
            </li>
            <li
              className='flex items-center gap-4 cursor-pointer'
              onClick={() => handleDelete(quote.id)}
            >
              <Bin />
              {t('delete')}
            </li>
          </ul>
        </div>
      </Select>
    </>
  );
};

export default QuoteMenu;
