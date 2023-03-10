import { Button, Heading, Icon403, Layout } from 'components';
import { NextPage } from 'next';
import Link from 'next/link';

const Custom403: NextPage = () => {
  return (
    <Layout className='min-h-screen flex-col items-center justify-center'>
      <div className='max-w-[15rem]'>
        <Icon403 />
      </div>
      <Heading
        heading='You shall not pass!'
        sub='Sorry, but  you don’t have permission to access this page'
        className='mt-7'
        error
      />
      <Link href='/' className='mt-6'>
        <Button text='Return home' style='buttonRed' />
      </Link>
    </Layout>
  );
};

export default Custom403;
