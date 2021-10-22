import View from "./view.js";

let fetchedData = null;

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

const AJAX = async function (url) {
    try {
        const fetchPro = fetch(url);

        const res = await Promise.race([fetchPro, timeout(5)]);//Change
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
}

const getAPI = async function () {
    try {
        const data = await AJAX(`https://api.github.com/repos/facebook/react/issues`);
        // console.log(data);
        fetchedData = data;
        return data;
    }
    catch (err) {
        console.log(err);
    }
}



await getAPI();

View.renderMarkupUsingData(fetchedData);