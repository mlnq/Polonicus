import React from "react";
import { Link } from "react-router-dom";

export default function NotFound()
{
    return(
 <>
        <h1>404 - Nie znaleziono wyniku !</h1>
        <Link to="/">Powrót do strony głównej</Link>
 </>
    );
}