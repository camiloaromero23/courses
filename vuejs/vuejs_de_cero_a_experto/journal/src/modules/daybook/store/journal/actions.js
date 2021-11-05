import journalApi from '@/api/journalApi';

export const createEntry = async ({ commit }, entry) => {
  const { date, picture, text } = entry;
  const entryDataToSave = { date, picture, text };
  const { data } = await journalApi.post('/entries.json', entryDataToSave);
  const { name: id } = data;
  const newEntry = { id, ...entryDataToSave };
  commit('addEntry', newEntry);
  return id;
};

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get('/entries.json');
  if (!data) {
    commit('setEntries', []);
    return;
  }
  const entries = [];
  for (const id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
    commit('setEntries', entries);
  }

  // console.log(entries);
};

export const updateEntry = async ({ commit }, entry) => {
  const { id, date, picture, text } = entry;
  const entryDataToSave = { date, picture, text };

  await journalApi.put(`/entries/${id}.json`, entryDataToSave);

  entryDataToSave.id = id;

  commit('updateEntry', { ...entryDataToSave });
};

export const deleteEntry = async ({ commit }, entryId) => {
  await journalApi.delete(`/entries/${entryId}.json`);
  commit('deleteEntry', entryId);
  return entryId;
};
