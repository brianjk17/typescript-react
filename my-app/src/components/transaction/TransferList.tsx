import React, {useState} from 'react';

type Props = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDestination: (account: string) => void;
}

function TransferList(props: Props) {
    const state = {...props};
    const list = {
        name: "categoryList",
        categories:[
            {
                name: "Food Supplier",
                items: [
                    {
                        name: "Anda",
                        account: "123819128"
                    },
                ]
            },
            {
                name: "Utensil Supplier",
                items: [
                    {
                        name: "Dan",
                        account: "123819129"
                    },
                    {
                        name: "Lein",
                        account: "123819123"
                    },
                ]
            },
            {
                name: "Rent",
                items: [

                ]
            }

        ]
    }

    const [displayList, setDisplayList] = useState(list);
    const handleItemClick = (account: string) => {
        state.selectedDestination(account);
        state.setShowModal(false);
    };

    return (
        <div className="flex flex-col p-3 rounded-r-lg shadow-lg max-w-sm w-full mx-auto justify-center">
            {displayList.categories.map((category, index) => (
                <React.Fragment>
                    <div className={"flex justify-between pl-2 pr-2 py-2 border-gray-400"}>
                        <b>{`Category: ${category.name}`}</b>
                    </div>

                    <ul className="dnd">
                        {category.items?.map((item, index) => (
                            (item.name !== null) &&
                            <li
                                // draggable
                                className={"flex flex-row p-6 pr-2 border-gray-400 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-800"}
                                key={index}
                                // onDragStart={() => handleDragStart(index)}
                                // onDragEnter={(e) => handleDragEnter(e, index)}
                                // onDragLeave={(e) => handleDragLeave(e)}
                                // onDrop={(e) => handleDrop(e)}
                                // onDragOver={(e) => e.preventDefault()}
                            >

                                <button className="flex justify-between w-full" onClick={() => handleItemClick(item.account)}>
                                    <span>
                                        {`${item.name}`}
                                    </span>
                                    <span>
                                        {`${item.account}`}
                                    </span>
                                </button>
                            </li>

                        ))}
                    </ul>
                </React.Fragment>
            ))}
        </div>
    );
}

export default TransferList;