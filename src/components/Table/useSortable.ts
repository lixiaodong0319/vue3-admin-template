let sorter = 'increase'

export const useSortable = (props) => {
  const handleSort = (col) => {
    if (sorter === 'decrease') {
      props.data.sort((a, b) => a[col.key] - b[col.key])
      sorter = 'increase'
    } else if (sorter === 'increase') {
      props.data.sort((a, b) => b[col.key] - a[col.key])
      sorter = 'decrease'
    }
  }

  return {
    handleSort
  }
}
