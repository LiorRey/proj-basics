const { useState, useEffect } = React

export function MouseMonitor() {
  const [isOn, setIsOn] = useState(true)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!isOn) return

    function updatePos(ev) {
      setPos(() => ({ x: ev.pageX, y: ev.pageY }))
    }

    // function addMouseListener() {
    //   document.addEventListener("mousemove", updatePos)
    // }

    // function removeMouseListener() {
    //   document.removeEventListener("mousemove", updatePos)
    // }

    // addMouseListener()

    // return () => removeMouseListener()

    document.addEventListener("mousemove", updatePos)

    return () => document.removeEventListener("mousemove", updatePos)
  }, [isOn])

  function onBtnClick() {
    setIsOn(isOn => !isOn)
  }

  return (
    <React.Fragment>
      <section className="mouse-monitor">
        <h4>Mouse Position</h4>
        {isOn && <h4>{`x: ${pos.x}, y: ${pos.y}`}</h4>}
        <button onClick={onBtnClick}>{isOn ? "Pause" : "Resume"}</button>
      </section>
    </React.Fragment>
  )
}
