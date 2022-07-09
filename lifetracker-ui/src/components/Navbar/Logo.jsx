import * as React from "react"
import {Link} from "react-router-dom"
import "../Navbar/Navbar.css"
import healthLogo from "../../../src/healthLogo.png"

export default function Logo()
{
    return(
              <Link to="/" className="logo"><img src={healthLogo} className="logo"/></Link>
    )
}