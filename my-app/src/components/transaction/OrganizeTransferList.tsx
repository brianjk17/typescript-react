import React, {FC, PropsWithChildren, useEffect, useState} from 'react';

type Item = {
    name: string,
    account: string
}

type Category = {
    name: string,
    items: Array<Item> | null
}

interface Props {
    transferList: { name: string; categories: { name: string; items: { name: string; account: string; }[]; }[]; },
    // x: React.Dispatch<React.SetStateAction<{ name: string; categories: { name: string; items: { name: string; account: number; }[]; }[]; }>>
}

const OrganizeTransferList: FC<PropsWithChildren<Props>> = ({transferList, children}) => {
    const [dragItem, setDragItem] = useState<any>();
    const [dragCategory, setDragCategory] = useState<any>();
    const [displayList, setDisplayList] = useState(transferList);

    // useEffect(() => {
    //     setDisplayList(transferList)
    //     console.log("running")
    // }, [transferList]);

    useEffect(
        () => {
            setDragCategory(1)
            setDisplayList(transferList)
            console.log("Dragging")
        },
        [transferList]
    )

    const deleteCategory = (inputCategory: Category) => {
        const targetCategories = transferList.categories
            .filter((item) => item.name !== inputCategory.name);
        //delete from front end
        setDisplayList((prevState) =>
            (
                {
                    ...prevState,
                    categories: targetCategories
                }
            )
        )

        //delete from backend
        transferList.categories.map((category, categoryIndex) => {
            if(category.name === inputCategory.name) {
                delete transferList.categories[categoryIndex]
            }
        })
    }

    const deleteItem = (transferDestination: string, categoryIndex: number) => {
        // const targetItem = transferList.categories[categoryIndex].items.filter((item) =>
        //             item.account !== transferDestination
        //     );

        transferList.categories.map((category, categoryIndex) => {
                category.items.map((item, itemIndex) => {
                    if(item.account === transferDestination) {
                        delete transferList.categories[categoryIndex].items[itemIndex]
                        setDisplayList((prevState) =>
                            (
                                {
                                    ...prevState,
                                    categories: [
                                        ...prevState.categories
                                    ]
                                }
                            )
                        )
                        console.log(transferList)
                        return transferList
                    }
                }
            )
            }
        );
    };

    const handleDragStart = (index: number) => {
        setDragCategory(index);
    };

    const handleDragEnter = (e: any, index: number) => {
        try {
            e.target.style.backgroundColor = "LightGray";
            const newList = transferList;
            const newCategories = transferList.categories;
            const item = newCategories[dragCategory];
            newCategories.splice(dragCategory, 1);
            newCategories.splice(index, 0, item);
            setDragCategory(index);
            newList.categories = newCategories;
            setDisplayList(newList);
        } catch (err){
            console.log(err)
        }
    };
    // const handleDragEnterItem = (e: any, categoryIndex: number, index: number) => {
    //     e.target.style.backgroundColor = "LightGray";
    //     const newList = transferList;
    //     const newItem = transferList.categories[categoryIndex].items;
    //     const item = newItem[dragItem];
    //     newItem.splice(dragItem, 1);
    //     newItem.splice(index, 0, item);
    //     setDragCategory(index);
    //     newList.categories[categoryIndex].items = newItem;
    //     setDisplayList(newList);
    // }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>|React.DragEvent<HTMLLIElement>) => {
        const element = e.target as HTMLLIElement;
        element.style.backgroundColor = "white";
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>|React.DragEvent<HTMLLIElement>) => {
        const element = e.target as HTMLLIElement;
        element.style.backgroundColor = "white";
    };

    return (
        <div className="flex flex-col p-3 rounded-r-lg shadow-lg max-w-sm w-full mx-auto justify-center">
            {displayList.categories.map((category, categoryIndex) => (
                <React.Fragment>
                    <div className={"flex justify-between pl-2 pr-2 py-2 border-gray-400 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-800"}
                         key={categoryIndex}
                         draggable
                         onDragStart={() => handleDragStart(categoryIndex)}
                         onDragEnter={(e) => handleDragEnter(e, categoryIndex)}
                         onDragLeave={(e) => handleDragLeave(e)}
                         onDrop={(e) => handleDrop(e)}
                         onDragOver={(e) => e.preventDefault()}
                    >
                        <b>{`${category.name}`}</b>
                        <button className="" onClick={() => deleteCategory(category)}>
                            <img className="h-6 object-cover"
                                 src={"https://img.icons8.com/windows/512/trash.png"}></img>
                        </button>
                    </div>

                    <ul className="dnd">
                        {category.items?.map((item, index) => (
                            (item.name !== null) &&
                            <li
                                className={"flex flex-row p-4 pr-3 border-gray-400"}
                                key={index}
                                // draggable
                                // onDragStart={() => handleDragStart(index)}
                                // onDragEnter={(e) => handleDragEnterItem(e, categoryIndex, index)}
                                // onDragLeave={(e) => handleDragLeave(e)}
                                // onDrop={(e) => handleDrop(e)}
                                // onDragOver={(e) => e.preventDefault()}
                            >

                                <div className="flex justify-between w-full mr-6">
                                        <span>
                                            {`${item.name}`}
                                        </span>
                                    <span>
                                            {`${item.account}`}
                                        </span>
                                </div>
                                <div className={""}>
                                    <button onClick={() => deleteItem(item.account, categoryIndex)}>
                                        <img className="h-6 object-cover"
                                             src={"https://img.icons8.com/windows/512/trash.png"}></img>
                                    </button>
                                </div>
                            </li>

                        ))}
                    </ul>
                </React.Fragment>
            ))}
        </div>
    );
}

export default OrganizeTransferList;