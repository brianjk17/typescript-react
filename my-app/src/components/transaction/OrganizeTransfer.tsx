import React, {useEffect, useState} from 'react';
import Header from "../Header";
import OrganizeTransferList from "./OrganizeTransferList";
// @ts-ignore
// import { Draggable, Droppable } from 'react-drag-and-drop';

type Item = {
    name: string,
    account: string
}

type Category = {
    name: string,
    items: Array<Item> | null
}

function OrganizeTransfer() {
    const list = {
        name: "categoryList",
        categories: [
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
                items: []
            }

        ]
    }

    const [inputCategory, setInputCategory] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputAccount, setInputAccount] = useState('');

    const [displayList, setDisplayList] = useState(list);
    const [inputDestinationCategory, setInputDestinationCategory] = useState<string>(list.categories[0].name);

    // useEffect(() => {
    //     return () => {
    //         console.log("Running")
    //     };
    // }, [displayList]);

    const addCategory = (inputCategory: string) => {
        const newCategory = {
            name: inputCategory,
            items: []
        }
        // displayList.categories.push(newCategory)
        setDisplayList((state) =>
            (
                {
                    ...state,
                    categories: [
                        ...state.categories,
                        newCategory
                    ]
                }
            )
        )
    }

    const addToCategory = (name: string, account: string, inputCategory: string) => {
        const newItem = {
            name: name,
            account: account
        }

        try {
            console.log(displayList)
            const newCategories = displayList.categories.map((category, index) => {
                    console.log(category.name)
                    console.log(inputCategory)
                    if (category.name === inputCategory) {
                        displayList.categories[index].items.push(newItem)
                        console.log("Got it")
                    }
                    return displayList.categories[index]
                }
            );
            console.log(newCategories)
            const newList = displayList
            // setDisplayList((state) =>
            //     (
            //         {
            //             ...state,
            //             categories: [
            //                 ...state.categories,
            //                 {
            //                     name: inputCategory,
            //                     items: [
            //                         ...state.categories[0].items,
            //                         {
            //                             name: name,
            //                             account: account
            //                         }
            //                     ]
            //                 }
            //             ]
            //         }
            //     ))
            setDisplayList(newList);
            setInputName('');
            setInputAccount('');
        } catch (err) {
            console.log("Bad request")
        }
    };

    const handleInputCategory = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputCategory(event.target.value);
    };
    const handleName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputName(event.target.value);
    };
    const handleAccount = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputAccount(event.target.value);
    };

    return (
        <div>
            <Header loggedIn={true}/>
            <div className={"flex flex-row justify-center space-x-2"}>
                <div>
                    <OrganizeTransferList
                        key={"displayList"}
                        transferList={displayList}
                    >
                    </OrganizeTransferList>
                </div>

                <div className={"flex flex-col"}>
                    <div className={"flex space-x-2 p-1.5 justify-center"}>
                        <input className="form-control
        inline-block
        w-60
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               type="text" id="category" name="category" onChange={handleInputCategory}
                        />
                        <button
                            onClick={() => addCategory(inputCategory)}
                            type="submit"
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Add
                            Category
                        </button>
                    </div>
                    <div
                        className="flex flex-col mt-4 p-6 rounded-r-lg shadow-lg max-w-sm w-full mx-auto justify-center">
                        <h5><b>Add Favorite</b></h5>
                        <label htmlFor="name">Name</label>
                        <input className="form-control
        inline-block
        w-80
        px-3
        py-1.5
        my-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               type="text" id="name" name="name" onChange={handleName}
                        />
                        <label htmlFor="account">Account</label>
                        <input className="form-control
        inline-block
        w-80
        px-3
        py-1.5
        my-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               type="text" id="account" name="account" onChange={handleAccount}
                        />
                        <select
                            className="form-select form-select-sm
    inline-block
    w-80
    px-3
    py-1.5
    my-1.5
    text-sm
    font-normal
    text-gray-700
    bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-sm example"
                            onChange={(e) => setInputDestinationCategory(e.target.value)}
                        >
                            {displayList.categories.map((category) =>
                                <option value={category.name}>{category.name}</option>
                            )}
                        </select>
                        <button
                            onClick={() => addToCategory(inputName, inputAccount, inputDestinationCategory)}
                            type="submit"
                            className="inline-block mt-2 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrganizeTransfer;