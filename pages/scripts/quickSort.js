function insertionSort(list,value) {
    const len = list.length
    for (let i = 1; i < len; i++) 
    {
      if (list[i][value] < list[0][value]) 
      {
        // move current element to the first position
        list.unshift(list.splice(i,1)[0])
      } 
      else if (list[i][value] > list[i-1][value]) 
      {
        // maintain element position
        continue
      } 
      else {
        // find where element should go
        for (let j = 1; j < i; j++) {
          if (list[i][value] > list[j-1][value] && list[i][value] < list[j][value]) 
          {
            // move element
            list.splice(j, 0, list.splice(i,1)[0])
          }
        }
      }
    }
    return list
  }
  