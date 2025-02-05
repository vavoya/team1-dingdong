import styled from "styled-components";

export const Table = styled.table.withConfig({
    shouldForwardProp: (prop) => !["column", "row"].includes(prop),
})<{ column?: string; row?: string }>`
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    thead, tbody {
        tr *:not(:first-child) {
            padding-left: ${({ column = "0px" }) => column};
        }
    }

    tbody {
        td, th {
            padding-top: ${({ row = "0px" }) => row};
        }
    }
`;
