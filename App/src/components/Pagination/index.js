import React from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import RippleContainer from "../RippleContainer"

import "./style.scss"

const Pagination = (props) => {
  const { currPage, setCurrPage, totalNumberOfPages } = props

  const handlePrev = () => {
    if (currPage > 0) {
      setCurrPage((prevValue) => prevValue - 1)
    }
  }
  const handleNext = () => {
    if (currPage < totalNumberOfPages - 1) {
      setCurrPage((prevValue) => prevValue + 1)
    }
  }

  const handlePageClick = (page) => {
    setCurrPage(page)
  }

  return (
    <div className="paginationContainer">
      <ul>
        <li className="icon" onClick={handlePrev}>
          <RippleContainer disable={currPage === 0}>
            <FaAngleLeft />
          </RippleContainer>
        </li>
        <li
          className={`${currPage === 0 ? "numb active" : "numb"}`}
          onClick={() => handlePageClick(0)}
        >
          <RippleContainer>1</RippleContainer>
        </li>
        {totalNumberOfPages > 2 && (
          <Pages
            currPage={currPage}
            totalNumberOfPages={totalNumberOfPages}
            handlePageClick={handlePageClick}
          />
        )}

        {totalNumberOfPages > 1 && (
          <li
            className={`${
              currPage === totalNumberOfPages - 1 ? "numb active" : "numb"
            }`}
            onClick={() => handlePageClick(totalNumberOfPages - 1)}
          >
            <RippleContainer>{totalNumberOfPages}</RippleContainer>
          </li>
        )}
        <li className="icon " onClick={handleNext}>
          <RippleContainer disable={currPage === totalNumberOfPages - 1}>
            <FaAngleRight />
          </RippleContainer>
        </li>
      </ul>
    </div>
  )
}

const Pages = (props) => {
  const { currPage, totalNumberOfPages, handlePageClick } = props
  let pages = []

  if (totalNumberOfPages < 6) {
    pages = [1, 2, 3, 4, 5]
  } else if (currPage < 3) {
    pages = [1, 2, 3, 4, "..."]
  } else if (currPage > totalNumberOfPages - 4) {
    pages = [
      "...",
      totalNumberOfPages - 4,
      totalNumberOfPages - 3,
      totalNumberOfPages - 2,
    ]
  } else {
    pages = ["...", currPage - 1, currPage, currPage + 1, "..."]
  }

  return (
    <>
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <li className="dots" key={index}>
              <RippleContainer disabled={true}>...</RippleContainer>
            </li>
          )
        }

        return (
          <li
            key={index}
            className={`${currPage === page ? "numb active" : "numb"}`}
            onClick={() => handlePageClick(page)}
          >
            <RippleContainer>{page + 1}</RippleContainer>
          </li>
        )
      })}
    </>
  )
}

export default Pagination
