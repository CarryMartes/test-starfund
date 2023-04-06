import React, {FC, useState} from "react";
import '../styles/Filters.scss'
import {IProduct} from "../model";
import {SORT_ORIENTATION} from "../services";
const FiltersBar: FC<{onCallback: (sortBy: keyof IProduct, orientation: SORT_ORIENTATION) => void}> = ({onCallback}) => {
    const [sortBy, setSortBy] = useState('price');
    const [orientation, setOrientation] = useState(SORT_ORIENTATION.ASC);

    const onSortChange = (e: keyof IProduct) => {
        setSortBy(e);
        onCallback(e, orientation);
    }

    const onOrientationChange = (e: SORT_ORIENTATION) => {
        setOrientation(e);
        onCallback(sortBy as any, e);
    }

    return (
        <div className="sort">
            <div>
                <span>Sort by: </span>
                <select onChange={e => onSortChange(e.target.value as keyof IProduct)}>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
            <select onChange={e => onOrientationChange(e.target.value as SORT_ORIENTATION)}>
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
            </select>
        </div>
    )
}

export default FiltersBar;