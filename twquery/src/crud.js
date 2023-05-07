import axios from 'axios';
import { faker } from '@faker-js/faker';

const API_URL = 'http://localhost:3000/notes';

export const fetchData = async () => {
  try {
    const resp = await axios.get(API_URL);
    console.log(resp); // kikomm
    return resp.data;
  } catch (err) {
    console.log(err);
  } finally {
    // console.log('wtf')
  }
}


export const getSingle = async (id) => {
  try {
    const resp = await axios.get(`${API_URL}/${id}`);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
}

export const getPage = async (pnum, limit) => {   // test function: not for call
  try {
    const resp = await axios.get(`${API_URL}/?_page=${pnum}&_limit=${limit}`);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
}
export const getPaginated = async (pnum, limit) => {   // 'limit' number of items per page
  try {
    const respall = await axios.get(API_URL);
    const fullLength = respall.data.length;
    const hasNext = (pnum * limit ) <= fullLength;
    console.log(fullLength, pnum, limit, hasNext)
    const resp = await axios.get(`${API_URL}/?_page=${pnum}&_limit=${limit}`);
    return {
      lista: resp.data,
      nextPage: hasNext ? pnum + 1 : undefined,
      previousPage: pnum > 1 ? pnum -1 : undefined,
    }
  } catch (err) {
    console.log(err);
  }
}

export const createEntry = async (item) => {
  try {
    const resp = await axios.post(API_URL, item);
    return item.id;
  } catch (err) {
    console.log(err);
  }
}

export const createFake = async () => {   // adapt this from your data!
  try {
    const uid = crypto.randomUUID();
    const newtitle = faker.lorem.sentence(4);
    const newtext = faker.lorem.paragraph();
    const input = {
        id: uid,
        title: newtitle,
        text: newtext,
        active: 1
    }
    const returnid = await createEntry(input);
    return returnid;
  } catch (err) {
    console.log(err);
  }
}

export const updateData = async (id, data) => {
  const resp = await axios.put(`${API_URL}/${id}`, data);
  return resp.data;
};

export const deleteData = async (id) => {
  const resp = await axios.delete(`${API_URL}/${id}`);
  return resp.data;
};

export const toggleItem = async (id) => {
  const single = await getSingle(id);
  const isActive = await single.active;
  const newActive = 1 - isActive;
  const resp = await axios.patch(`${API_URL}/${id}`, {active: newActive});
  return resp.data;
}

export const updateRandom = async(id) => {
  const single = await getSingle(id);
  const uid = await single.id;
  const newtitle = faker.lorem.sentence(3);
  const newtext = faker.lorem.paragraph();
  const input = {
      id: uid,
      title: newtitle,
      text: newtext,
      active: 1
  }
  const returnid = await updateData(uid, input);
}