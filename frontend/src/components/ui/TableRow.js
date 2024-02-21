import { camelCaseToTitleCase } from "#utils/stringManipulation"
import styles from "./tableRow.module.scss"

const TableRow = ({ data }) => {
  const headers = Object.keys(data)

  return (
    <div className={styles.userDataTable}>
      <div className={styles.tableRow}>
        {headers.map((header, index) => (
          <div key={index} className={styles.tableCell}>
            <div className={styles.tableHeaderCell}>
              {`${camelCaseToTitleCase(header)}`}
              <span>: </span>
            </div>

            <div key={index} className={styles.tableDataCell}>
              {data[header]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableRow
