import { parse } from 'dirty-json';
import _ from 'lodash';
import swal from 'sweetalert2';

export const jsonFormatter = (input) => {
  const showErrorAlert = () => {
    swal
      .fire({
        title: 'Invalid data!',
        text: 'Please, insert all kinds of data required!',
        icon: 'error'
      })
      .then(() => {
        // safeguard to avoid crashing, it forces the page to reload
        window.location.reload();
      });
  };

  // Get and format labels from start & stop timestamps
  const timestampConverter = (start, stop) => {
    const convert = (time) => {
      let data = new Date(time);
      let minutes = String(data.getMinutes()).padStart(2, '0');
      let seconds = String(data.getSeconds()).padStart(2, '0');

      return `${minutes}:${seconds}`;
    };

    const startTime = convert(start);
    const stopTime = convert(stop);

    // console.log('labels', [`${startTime}`, `${stopTime}`]);
    return [`${startTime}`, `${stopTime}`];
  };

  // Defining valid visible data range based on span's 'begin' and 'end' timestamp.
  const dataTrimmer = (data, begin, end) => {
    const validRange = _.filter(data, (object) => object.timestamp >= begin && object.timestamp <= end);
    return validRange;
  };

  // Formatting to start composing datasets
  const dataFormatter = (data) => {
    const showWarningAlert = (missing) => {
      swal.fire({
        title: 'Missing data!',
        text: `Please, insert all ${missing} input required to get a proper result.`,
        icon: 'warning'
      });
    };

    // Capitalizing info strings
    const capitalizeInfo = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const finalObject = data.map((object) => {
      let os = '';
      let browser = '';
      if (object.os) {
        os = capitalizeInfo(object.os);
      } else {
        os = '(MISSING)';
        showWarningAlert('operational system');
      }
      if (object.browser) {
        browser = capitalizeInfo(object.browser);
      } else {
        browser = '(MISSING)';
        showWarningAlert('browser');
      }
      let minTime = object.min_response_time;
      let maxTime = object.max_response_time;

      return {
        info: `${os} ${browser}`,
        min_response_time: minTime,
        max_response_time: maxTime,
        timestamp: object.timestamp
      };
    });

    return finalObject;
  };

  // Return minimum and maximum value from an array
  const getMinMax = (array) => {
    let max = array.reduce((a, b) => {
      return Math.max(a, b);
    });

    let min = array.reduce((a, b) => {
      return Math.min(a, b);
    });

    return [min, max];
  };

  // Separating the groupedData by min and max response values
  const minMaxFormatter = (values) => {
    const minValues = values.map((object) => {
      const obj = { ...object };
      let minArray = [];

      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const element = obj[key];
          minArray.push(element.min_response_time);
        }
      }
      let [min, max] = getMinMax(minArray);
      let data = [{ x: min }, { x: max }];

      return {
        label: `${obj[0].info} ${Object.keys(obj[0])[1]}`,
        data,
        timestamp: [object[0].timestamp, object[object.length - 1].timestamp]
      };
    });

    const maxValues = values.map((object) => {
      const obj = { ...object };
      let maxArray = [];

      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const element = obj[key];
          maxArray.push(element.max_response_time);
        }
      }
      let [min, max] = getMinMax(maxArray);
      let data = [{ x: min }, { x: max }];

      return {
        label: `${obj[0].info} ${Object.keys(obj[0])[2]}`,
        data,
        timestamp: [object[0].timestamp, object[object.length - 1].timestamp]
      };
    });

    return [...minValues, ...maxValues];
  };

  // Compose datasets
  const createDatasetsArray = (data) => {
    const singleDataset = data.map((object) => {
      const r = () => {
        return (Math.random() * 256) >> 0;
      };
      let randomColor = `rgb(${r()}, ${r()}, ${r()})`;

      return {
        label: object.label,
        data: [
          { x: object.timestamp[0], y: object.data[0].x },
          { x: object.timestamp[1], y: object.data[1].x }
        ],
        backgroundColor: randomColor,
        borderColor: randomColor,
        pointBorderWidth: 8,
        pointHoverRadius: 8,
        borderWidth: 6
      };
    });

    const datasets = [];
    singleDataset.forEach((object) => {
      datasets.push(object);
    });

    return datasets;
  };

  if (input !== undefined) {
    const inputArray = input.split('\n').filter((value) => value !== '');
    const objectsArray = inputArray.map((value) => {
      try {
        return parse(value.replace('},', '}'));
      } catch (err) {
        showErrorAlert();
        return [null, null];
      }
    });

    if (objectsArray === undefined || objectsArray.length <= 1) {
      showErrorAlert();
      return [null, null];
    }

    const groupedObjects = _.groupBy(objectsArray, (object) => object.type);

    if (
      groupedObjects.start === undefined ||
      groupedObjects.stop === undefined ||
      groupedObjects.span === undefined ||
      groupedObjects.data === undefined
    ) {
      showErrorAlert();
      return [null, null];
    }

    // console.log('grouped', groupedObjects);
    const [start] = groupedObjects.start;
    const [stop] = groupedObjects.stop;
    const [span] = groupedObjects.span;
    const dataGroup = groupedObjects.data;

    if (start === undefined || stop === undefined || span === undefined || dataGroup === []) {
      showErrorAlert();
      return [null, null];
    }

    const labels = timestampConverter(start.timestamp, stop.timestamp);

    const dataRanged = dataTrimmer(dataGroup, span.begin, span.end);
    const formattedData = dataFormatter(dataRanged);

    // console.log('cleaner', formattedData);
    const groupedData = _.groupBy(formattedData, (data) => data.info);
    // console.log('groupedData', groupedData);
    const minMaxArrays = minMaxFormatter(Object.values(groupedData));
    const datasets = createDatasetsArray(minMaxArrays);

    return { labels: labels, datasets: datasets };
  } else {
    showErrorAlert();
  }
};
