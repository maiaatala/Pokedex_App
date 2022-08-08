import React from "react"
import "./style.scss"

const RippleContainer = (props) => {
  const [state, setState] = React.useState("")
  const [rippleStyle, setRippleStyle] = React.useState({})

  let timerId
  const ripple = React.useRef(null)
  const button = React.useRef(null)

  const onMouseDown = (e) => {
    setState("")
    clearTimeout(timerId)
    const size = button.current.offsetWidth
    const posButton = button.current.getBoundingClientRect()
    // const x = posButton.left - e.clientX
    const x = e.pageX - posButton.left - size
    const y = e.pageY - posButton.top - size
    // const y = posButton.top - e.clientY

    const newRippleStyle = {
      top: `${y}px`,
      left: `${x}px`,
      width: `${size * 2}px`,
      height: `${size * 2}px`,
    }

    setRippleStyle(newRippleStyle)

    setState("ripple-start ripple-active")
    timerId = setTimeout(() => {
      setState("")
    }, 500)
  }

  return (
    <div
      className="rippleContainer"
      onMouseDown={onMouseDown}
      ref={button}
      onClick={props.onClick}
    >
      {props.children}

      {!props.disable && (
        <span className={`ripple ${state}`} style={rippleStyle} ref={ripple} />
      )}
    </div>
  )
}

export default RippleContainer
