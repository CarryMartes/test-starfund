import React, {FC} from "react";
import '../styles/SearchBar.scss'
interface IProp {
    onChange: (val: string) => void;
}

const SearchBar: FC<IProp> = ({onChange}) => {

    return (
        <div className="searchbar">
            <input type="text"
                   onKeyUp={(e) => onChange(((e.target) as any).value)}
                   placeholder="Search by title" />
        </div>
    )
}

export default SearchBar;