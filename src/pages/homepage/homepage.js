import React, { useEffect, useRef, useState } from "react";
import LazyLoad from "react-lazyload";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { bindActionCreators } from "redux";
import { getPageData } from "../../actions/pageData";
import CardComponent from "../../components/card/card";
import { rowLimit } from "../../config";

const Homepage = ({
  content = {},
  isSearchActive,
  getPageData,
  pageSize,
  searchContent,
  totalItems,
}) => {
  const containerRef = useRef(null);
  const startOffset = 0; // Render items from this index
  // config for Intersection observer
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.4,
  };

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  const validatePageCount = () => {
    // Set page count based on requested content length
    setPageCount(totalItems - content.length > 0 ? pageCount + 1 : pageCount);
  };

  //state variables
  const [isVisible, setIsVisible] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [endOffset, setEndOffset] = useState(0); // last index that has to be rendered
  const [requestedItemsCount, setCount] = useState(0); // Total Count of items requested

  useEffect(() => {
    getPageData({ index: pageCount });
  }, [pageCount]);

  useEffect(() => {
    if (isVisible && requestedItemsCount < totalItems) {
      validatePageCount();
    }
  }, [isVisible]);

  useEffect(() => {
    setCount(requestedItemsCount + Number(pageSize));
    // calculate end offset based on number of cards to be rendered in a row
    setEndOffset(content.length - (content.length % rowLimit));
  }, [content]);

  useEffect(() => {
    // Set up intersection observer
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current && requestedItemsCount < totalItems) {
      // Track last element, when last elemt is visible then make an api call
      if (containerRef.current.firstChild.lastChild) {
        observer.observe(containerRef.current.firstChild.lastChild);
      }
    }
    if (requestedItemsCount === totalItems) {
      // Un-observe all the elements when all the items are rendered.
      observer.disconnect();
    }
    return () => {
      observer.disconnect();
    };
  }, [containerRef, options]);
  return (
    <React.Fragment>
      <div ref={containerRef}>
        <Row className={`homepage`}>
          {!isSearchActive && content?.length
            ? content?.slice(startOffset, endOffset)?.map((item, index) => (
                <Col key={index} xs={4}>
                  <LazyLoad height={600} placeholder={"loading"} debounce={500}>
                    <CardComponent
                      name={item.name}
                      imageName={item["poster-image"]}
                    />
                  </LazyLoad>
                </Col>
              ))
            : null}
          {isSearchActive && searchContent?.length
            ? searchContent?.map((item, index) => (
                <Col key={index} xs={4}>
                  <LazyLoad height={600} placeholder={"loading"} debounce={500}>
                    <CardComponent
                      name={item.name}
                      imageName={item["poster-image"]}
                    />
                  </LazyLoad>
                </Col>
              ))
            : null}
        </Row>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ pageData = {}, search }) => {
  const {
    content = [],
    pageSize = 0,
    searchContent,
    totalItems = 0,
  } = pageData;
  return {
    content,
    totalItems,
    pageSize,
    searchContent,
    isSearchActive: search.isSearchActive,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData: bindActionCreators(getPageData, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
