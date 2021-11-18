import { createStore } from 'vuex';
import journal from '../../../../../../src/modules/daybook/store/journal';
import { journalState } from '../../../../../mock-data/test-journal-state';

import authApi from '@/api/authApi';

const createVuexStore = initialState =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe('vuex - Journal module tests', () => {
  beforeAll(async () => {
    const { data } = await authApi.post(':signInWithPassword', {
      email: 'test@test.com',
      password: '123456',
      returnSecureToken: true,
    });

    localStorage.setItem('idToken', data.idToken);
  });
  // Basics
  it('should have the same initial state', async () => {
    const store = createVuexStore(journalState);
    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  // Mutations
  it('should mutate state correctly with setEntries', async () => {
    const store = createVuexStore({ loading: true, entries: [] });

    store.commit('journal/setEntries', journalState.entries);

    const { isLoading, entries } = store.state.journal;

    expect(entries.length).toBe(2);
    expect(isLoading).toBeFalsy();
  });

  it('should mutate state correctly with updateEntry', () => {
    const store = createVuexStore(journalState);
    const updatedEntry = journalState.entries[0];
    updatedEntry.text = 'Updated Entry';

    store.commit('journal/updateEntry', updatedEntry);

    const { entries } = store.state.journal;

    expect(entries.length).toBe(2);
    expect(entries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry);
  });

  it('should mutate state correctly with addEntry & deleteEntry', () => {
    const store = createVuexStore(journalState);
    const createdEntry = { id: 'ABC-123', text: 'Created entry' };

    store.commit('journal/addEntry', createdEntry);

    let { entries } = store.state.journal;

    expect(entries.length).toBe(3);
    expect(entries.includes(createdEntry)).toBeTruthy();

    store.commit('journal/deleteEntry', createdEntry.id);

    entries = store.state.journal.entries;

    expect(entries.length).toBe(2);
    expect(entries.includes(createdEntry)).toBeFalsy();
  });

  // Getters
  it('should use getEntriesByTerm & getEntryById properly', () => {
    const store = createVuexStore(journalState);

    const [entry1, entry2] = journalState.entries;

    expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2);
    expect(store.getters['journal/getEntriesByTerm']('Halo').length).toBe(1);

    expect(store.getters['journal/getEntriesByTerm']('Halo')).toEqual([entry2]);
    expect(
      store.getters['journal/getEntryById']('-MjXVqVZAR54aeePmb7I'),
    ).toEqual(entry1);
  });

  // Actions
  it('should use loadEntries action properly', async () => {
    const store = createVuexStore({ loading: true, entries: [] });

    await store.dispatch('journal/loadEntries');

    expect(store.state.journal.entries.length).toBe(2);
  });

  it('should use updateEntry action properly', async () => {
    const store = createVuexStore(journalState);

    const updatedEntry = journalState.entries[0];
    updatedEntry.otherField = true;
    updatedEntry.anotherOne = { a: 1 };

    await store.dispatch('journal/updateEntry', updatedEntry);

    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find(e => e.id === updatedEntry.id),
    ).toEqual({
      id: updatedEntry.id,
      date: updatedEntry.date,
      text: updatedEntry.text,
    });
  });

  it('should use createEntry & deleteEntry actions properly', async () => {
    const store = createVuexStore(journalState);

    const newEntry = {
      date: 1599999999999,
      text: 'New entry from tests',
    };

    const id = await store.dispatch('journal/createEntry', newEntry);

    expect(typeof id).toBe('string');

    expect(store.state.journal.entries.find(e => e.id === id)).toBeTruthy();

    await store.dispatch('journal/deleteEntry', id);

    expect(store.state.journal.entries.find(e => e.id === id)).toBeFalsy();
  });
});
