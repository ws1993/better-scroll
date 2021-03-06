import React, { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import MouseWheel from '@better-scroll/mouse-wheel'

BScroll.use(Slide)
BScroll.use(MouseWheel)

const createArray = (length) => Array.from({ length }, (_v, i) => i + 1)
const nums = createArray(4)

const VerticalSlide = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const wrapperRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!scrollRef.current) {
      const BS = (scrollRef.current = new BScroll(wrapperRef.current, {
        scrollX: false,
        scrollY: true,
        slide: {
          loop: true,
          threshold: 100,
        },
        mouseWheel: true,
        momentum: false,
        bounce: false,
        stopPropagation: true,
      }))

      BS.on('scrollEnd', () => {
        setCurrentPageIndex(BS.getCurrentPage().pageY)
      })
    }

    return () => {
      scrollRef.current?.destroy()
    }
  }, [])

  return (
    <div className="mouse-wheel-slide-vertical view">
      <div className="slide-container">
        <div className="slide-wrapper" ref={wrapperRef}>
          <div className="slide-content">
            {nums.map((num) => (
              <div key={num} className={`slide-page page${num}`}>
                page {num}
              </div>
            ))}
          </div>
        </div>
        <div className="dots-wrapper">
          {nums.map((num) => (
            <span
              key={num}
              className={classNames('dot', {
                active: currentPageIndex === num - 1,
              })}
            ></span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VerticalSlide
