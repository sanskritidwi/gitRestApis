import  React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

export default function PaginationControlled({onPageChange}) {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    onPageChange(value)
  };

  return (
    <Stack spacing={2}>
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination count={10} page={page} onChange={handleChange} className='centered' />
    </Stack>
  );
}