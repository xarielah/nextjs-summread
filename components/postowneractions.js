import { Button, Link, Box } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon, SpinnerIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import NextLink from 'next/link';
import axios from 'axios';
import Alert from './alert/alert';
import { useRouter } from 'next/router';

const ShowActionsBar = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deletionStatus, setDeletionStatus] = useState(false);
  const router = useRouter();

  const deletePost = async (id = post._id) => {
    try {
      const url = process.env.PROD ? process.env.PROD : process.env.LOCAL;
      await axios.post(`${url}/api/actions/delete`, { id }).then(res => res.data);
      setIsLoading(false);
      setDeletionStatus(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  if (deletionStatus)
    return (
      <Alert type="success">
        Post &apos;{post.title}&apos; was deleted successfuly, and would be accessable anymore by any means. You may leave this
        page safely.
      </Alert>
    );
  else
    return (
      <Menu>
        <MenuButton textDecoration={'underline'} color="purple.600">
          Manage Post
          <ChevronDownIcon ml={1} />
        </MenuButton>
        <MenuList>
          <NextLink href={`${router.basePath}/post/${post._id}/edit`}>
            <Link style={{ textDecoration: 'none' }}>
              <MenuItem fontStyle={'italic'}>Edit Post</MenuItem>
            </Link>
          </NextLink>
          <MenuItem
            fontStyle={'italic'}
            color="red"
            onClick={() => {
              if (!isLoading) {
                deletePost();
                setIsLoading(true);
              }
            }}>
            {isLoading ? <SpinnerIcon /> : 'Delete Post'}
          </MenuItem>
        </MenuList>
      </Menu>
    );
};

export default ShowActionsBar;
