import { GetRowsCallback, PostRowCallback, Table, Token } from "../lib/datasource";
import { JobInfo } from "../lib/platform";

const tokenPostRow: PostRowCallback<Token> = (row) => {
    console.log(`Posting row to table ${tokenTable.name}...`);
    console.log(row);
}

const tokenGetRows: GetRowsCallback<Token> = (filter) => {
    console.log(`Getting rows from table ${tokenTable.name}...`);
    return [];
}

const tokenTable: Table<Token> = {
    name: 'tokens',
    is_created: false,
    create: () => {
        console.log(`Creating table ${tokenTable.name}...`);
        tokenTable.is_created = true;
    },
    postRow: tokenPostRow,
    getRows: tokenGetRows,
}

const jobInfoPostRow: PostRowCallback<JobInfo> = (row) => {
    console.log(`Posting row to table ${tokenTable.name}...`);
    console.log(row);
}

const jobInfoGetRows: GetRowsCallback<JobInfo> = (filter) => {
    console.log(`Getting rows from table ${tokenTable.name}...`);
    return [];
}

const jobInfoTable: Table<JobInfo> = {
    name: 'jobs',
    is_created: false,
    create: () => {
        console.log(`Creating table ${jobInfoTable.name}...`);
        jobInfoTable.is_created = true;
    },
    postRow: jobInfoPostRow,
    getRows: jobInfoGetRows,
}

const datasource = {
    name: 'csv',
    tokenTable,
    jobInfoTable,
}

export default datasource;