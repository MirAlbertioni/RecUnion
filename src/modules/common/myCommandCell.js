import * as React from "react";

export const MyCommandCell = props => {
    const { dataItem } = props;

    if (props.addedArtists !== undefined &&
        props.addedArtists !== null &&
        props.addedArtists.some(x => x.id === dataItem.id)) {
        return <td className="k-command-cell"></td>;
    }

    return (
        <td className="k-command-cell">
            {
                props.showAdd &&
                <button
                    className="k-button"
                    onClick={() => props.add(dataItem)}
                >
                    Add
                </button>
            }

            {
                props.showDelete &&
                <button
                    className="k-button"
                    onClick={() => props.remove(dataItem)}
                >
                    Remove
                </button>
            }
        </td>
    );
};
