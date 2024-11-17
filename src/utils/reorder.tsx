// A helper function to reorder a list
const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list); // Create a shallow copy of the list
  const [removed] = result.splice(startIndex, 1); // Remove the item from the startIndex
  result.splice(endIndex, 0, removed); // Insert the item at the endIndex

  return result;
};

export default reorder;
