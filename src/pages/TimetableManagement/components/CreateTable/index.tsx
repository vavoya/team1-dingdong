import {Children, cloneElement, ReactElement, ReactNode} from "react";
import {Table} from "@/pages/TimetableManagement/components/CreateTable/styles.ts";


interface CreateTableProps {
    gap: {
        column: string,
        row: string,
    },
    title: {
        column: ReactNode[],
        row: ReactNode[]
    }
    columnWidth: string[],
    children: ReactElement[],
}
export default function CreateTable({gap, title, columnWidth, children}: CreateTableProps) {

    // children tr 검사
    children.forEach((child, index) => {
        if (child.type !== 'tr') {
            throw new Error(
                `Create Table Error: Row type is not 'tr' [${index}]`
            )
        }
    })

    // `tr` 개수와 `title.row.length` 검사
    if (children.length !== title.row.length) {
        throw new Error(
            `CreateTable Error: Number of rows (${children.length}) does not match row titles (${title.row.length}).`
        );
    }

    // 각 `tr` 내부의 `td` 개수 검사
    children.forEach((child, rowIndex) => {
        const tdCount = Children.toArray(child.props.children).length;

        if (tdCount !== title.column.length) {
            throw new Error(
                `CreateTable Error: Row at index [${rowIndex}] has ${tdCount} columns, but expected ${title.column.length}.`
            );
        }
    });


    return (
        <Table column={gap.column} row={gap.row}>
            <colgroup>
                {
                    columnWidth.map((width, index) => {
                        return <col key={index} style={{width: width}}/>
                    })
                }
            </colgroup>
            <thead>
                <tr>
                    <th />
                    {title.column.map((column, index) => {
                        return <th key={index}>{column}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {
                    children.map((row, index) => {
                        return (
                            cloneElement(row, {
                                key: index,
                                children: renderRow({
                                    rowTitle: title.row[index],
                                    rowCells: Children.toArray(row.props.children)
                                })
                            })
                        )
                    })
                }
            </tbody>
        </Table>
    )
}


interface RenderRowProps {
    rowTitle: ReactNode,
    rowCells: ReactNode[],
}
function renderRow({rowTitle, rowCells}: RenderRowProps) {

    return (
        <>
            <th>
                {rowTitle}
            </th>
            {
                rowCells.map((cell, index) => {
                    return <td key={index}>{cell}</td>
                })
            }
        </>
    )
}