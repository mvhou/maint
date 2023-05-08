    const button = document.querySelector("#convert")
    const bs = button.style
    const text = button.querySelector(".button-text")
    const mac = document.querySelector("#apple")
    const windows = document.querySelector("#windows")
    
    
    const convert = async () => {
      const path = await navigator.clipboard.readText()
      let newState = ["failed"]
      if (path.slice(0,2) == "\\\\")
        newState = ["success", mac, windows, "smb:" + path.replace(/\\/g, "/")]
      else if (path.slice(0,4) == "smb:")
        newState = ["success", windows, mac, path.slice(4).replace(/\//g, "\\")]
      text.classList.remove("fast-fade")
      text.classList.add("fast-fade")
      button.classList.add(newState[0])
      setTimeout(() => {text.textContent = newState[0]}, 100)
      if (newState[0] != "failed") {
        newState[1].classList.add("buzz")
        newState[2].classList.add("fade")
        await navigator.clipboard.writeText(newState[3])
      }
      setTimeout(() => {
        text.classList.remove("fast-fade")
        text.classList.add("fast-fade")
        text.textContent = "convert"
        button.classList.remove(newState[0])
        if (newState[0] === "failed")
          return
        newState[1].classList.remove("buzz")
        newState[2].classList.remove("fade")
      }, 1800)
    }

    button.onclick = convert;