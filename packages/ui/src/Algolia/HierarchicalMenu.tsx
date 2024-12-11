'use client';
import React from 'react';
import { useHierarchicalMenu, type UseHierarchicalMenuProps } from 'react-instantsearch-core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

type HierarchicalListProps = {
  items: any[]; // Replace 'any' with the actual type of your 'items' array
  createURL: (value: string) => string;
  onNavigate: (value: string) => void;
  onChangeCb: (event: any) => void;
};

const FACETS_NAME_MAP: { [key: string]: string } = {
  Blog: 'News',
  Page: 'General'
};

const HierarchicalList = ({ onChangeCb, items, createURL, onNavigate }: HierarchicalListProps) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.value}
          sx={{ alignItems: 'flex-start', flexDirection: 'column', padding: 0 }}>
          <ListItemButton
            sx={{ 'width': '100%', '&:hover': { backgroundColor: 'transparent' } }}
            disableRipple
            disableTouchRipple
            role={undefined}
            onClick={() => onNavigate(item.value)}
            dense>
            <ListItemIcon
              sx={{
                'minWidth': 'auto',
                'mr': 1,
                '& span': {
                  p: 0
                }
              }}>
              <Checkbox
                sx={{
                  '&.Mui-checked': {
                    opacity: 1,
                    color: 'var(--mui-palette-text-primary)'
                  }
                }}
                edge="start"
                checked={item.isRefined}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ variant: 'body2' }}
              primary={FACETS_NAME_MAP[item.label] ?? item.label}
            />
          </ListItemButton>

          {item.data && (
            <Collapse in={item.isRefined} sx={{ paddingLeft: 2 }}>
              <HierarchicalList
                onChangeCb={onChangeCb}
                items={item.data}
                onNavigate={onNavigate}
                createURL={createURL}
              />
            </Collapse>
          )}
        </ListItem>
      ))}
    </List>
  );
};

const HierarchicalMenu = (props: UseHierarchicalMenuProps) => {
  const { items, refine, canToggleShowMore, toggleShowMore, isShowingMore, createURL } =
    useHierarchicalMenu(props);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    refine(event.target.value);
  };

  return (
    <>
      <HierarchicalList
        onChangeCb={onChange}
        items={items}
        onNavigate={refine}
        createURL={createURL}
      />
      {props.showMore && (
        <Button disabled={!canToggleShowMore} onClick={toggleShowMore} variant="outlined">
          {isShowingMore ? 'Show less' : 'Show more'}
        </Button>
      )}
    </>
  );
};

export default HierarchicalMenu;
