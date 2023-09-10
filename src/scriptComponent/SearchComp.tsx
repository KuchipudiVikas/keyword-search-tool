import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Input } from "antd";
import { debounce } from "lodash";
import { EtsyService } from "../api/etsy";
import { GoogleService } from "../api/google";
import { MODIFIERS } from "../utils/modifiers";

const StyledSearch = styled(Input.Search)`
  background-color: #f0f0f0;
  border-color: #ffbb5c !important;

  /* Target the button inside the Search component */
  .ant-btn-primary {
    background-color: #ffbb5c !important;
    border-color: #ffbb5c !important;
  }

  .ant-input {
    border-color: #ffbb5c !important;
  }

  .ant-input:focus {
    border-color: #ffbb5c !important;
    box-shadow: 0 0 0 2px rgba(255, 187, 92, 0.2) !important; /* Optional: if you want a shadow around the focused input */
  }
`;
// const { Search } = Input;

export const SearchComp: React.FC<{
  setKeywords: (keywords: Array<string>) => void;
  domain: string;
  isExtendedResults: boolean;
}> = ({ setKeywords, domain, isExtendedResults }) => {
  const [query, setQuery] = useState("");
  const [domainName, setDomainName] = useState(domain);
  // This function will only be invoked once every 300 milliseconds
  // of not being called. You can adjust the time as per your requirements.
  let normalResults = [];
  const LongerDebounceSearch = useCallback(
    debounce(async (query) => {
      if (domain == "etsy") {
        console.log("longer debounce", query);
      } else if (domain == "google") {
        let extendedResults = await GoogleService.getExtendedSuggestions(
          query.toLowerCase()
        );

        console.log("i was being called");
        let finalResults = [...normalResults, ...extendedResults];
        setKeywords(finalResults);
      }
    }, 300),
    []
  );

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      // Replace this with your API call or any other function
      /**Main */
      if (domain == "etsy") {
        const result = await EtsyService.getSuggestions(query.toLowerCase());
        const finalResult = await EtsyService.multiSearch(result);
        normalResults = finalResult;
        setKeywords(finalResult);
      } else if (domain == "google") {
        const result = await GoogleService.getSuggestions(query.toLowerCase());
        const finalResult = await GoogleService.multiSearch(result);
        normalResults = finalResult;
        setKeywords(finalResult);
      }
    }, 300),
    [] // This ensures the debounced function remains consistent between renders
  );

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    console.log("without debounce", newQuery);
    debouncedSearch(newQuery);
    if (isExtendedResults) {
      LongerDebounceSearch(newQuery);
    }
  };

  return (
    <>
      <StyledSearch
        value={query}
        onChange={handleInputChange}
        placeholder="Search Keyword"
        loading={false}
        enterButton
      />
      <br />
    </>
  );
};
