function binarySearch(time, arrayData, low, high) {

    let highTime = arrayData[high].offsetTimestamp;
    let lowTime = arrayData[low].offsetTimestamp;

    if (time > highTime) {
        return high;
    }

    // 没有中值, 返回-1
    if (time < lowTime){
        return -1;
    }

    let mid = Math.round((low + high)/ 2);
    let midTime = arrayData[mid].offsetTimestamp;

    if (Math.abs(high - low) == 1) {
        // 因为取四舍五入的二分
        if (time < highTime) {
            return low;
        }
        else {
            return high;
        }
    }

    if (midTime == time) {
        return mid;
    }

    if (midTime < time) {
        return binarySearch(time, arrayData, mid, high);
    }
    else {
        return binarySearch(time, arrayData, low, mid);
    }
}




/**
 * 二分查找
 * @param {number} time 时间戳
 * @param {Array} arrayData 数据
 * @param {number} 当前索引
 */
export function bisearch(time, arrayData, curIndex) {
    let low = curIndex || 0;
    let arrLength = arrayData.length;

    // 没有数据
    if (arrLength === 0) {
        return -1;
    }
    //  只有一个数据
    if (arrLength == 1) {
        if (arrayData[0].offsetTimestamp > time) {
            return -1;
        }
        else {
            return 0;
        }
    }

    if (low >= high) {
        return high;
    }

    let high = arrayData.length - 1;
    // 找到中值索引，可能返回-1
    let mid = binarySearch(time, arrayData, low, high);

    if (mid > low) {
        // 相同时间戳可能有多个值，找到最后一个
        for (let i = mid; i <= high; i++) {
            let arrayTime = arrayData[i].offsetTimestamp;

            if (arrayTime == time) {
                mid = i;
            }

            if (arrayTime > time) {
                break;
            }
        }
    }

    return mid;
};