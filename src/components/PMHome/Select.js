import React, { Component, useEffect, useState } from 'react';
import Select from 'react-select';
import { components } from 'react-select';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import axiosInstance from '../../helpers/axiosInstance';
const SelectMenuButton = (props) => {
  const onButtonClick = () => {
    props.selectProps.getMore();
  };
  return (
    <components.MenuList ref={props.ref} {...props}>
      {props.children}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        ref={props.selectProps.refProp}
        onClick={onButtonClick}
      >
        Load more...
      </div>
    </components.MenuList>
  );
};

const SelectComponent = (props) => {
  const [options, setOptions] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [nameFilter, setNameFilter] = useState('');

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['projects-inf', nameFilter],
    async ({ pageParam = 0 }) => {
      const res = await axiosInstance.get(
        `/profiles?filters[name][$containsi]=${nameFilter}&pagination[pageSize]=2&pagination[page]=` +
          pageParam
      );
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => {
        if (
          lastPage.meta.pagination.pageCount - lastPage.meta.pagination.page <=
          0
        ) {
          return undefined;
        } else {
          return lastPage.meta.pagination.page + 1;
        }
      },
    }
  );

  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    console.log(props.employees);
  }, [props.employees]);

  useEffect(() => {
    if (data?.pages) {
      let newArray = [];
      data.pages.map((page) => {
        page.data.map((item) => {
          newArray.push({
            value: item.id,
            label: item.attributes.name,
            color: '#00B8D9',
            isFixed: true,
          });
        });
      });
      setOptions(newArray);
    }
  }, [data]);

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      isDisabled={false}
      isLoading={false}
      isClearable={false}
      value="Select"
      onInputChange={(val) => setNameFilter(val)}
      onChange={(item) => {
        props.setEmployees([...props.employees, item.value]);
      }}
      isRtl={false}
      isSearchable={true}
      name="members"
      options={options}
      maxMenuHeight={130}
      refProp={ref}
      getMore={fetchNextPage}
      components={{ MenuList: SelectMenuButton }}
    />
  );
};

export default SelectComponent;
