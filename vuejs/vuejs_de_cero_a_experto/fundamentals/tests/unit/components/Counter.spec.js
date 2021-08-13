import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/Counter';

describe('Counter Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  test('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should have "Counter" as default value of h2', () => {
    const h2Tag = wrapper.find('h2');

    expect(h2Tag.exists()).toBeTruthy();

    expect(h2Tag.text()).toBe('Counter');
  });

  test('should have 0 as default value inside the p', () => {
    const value = wrapper.find('[data-testid="counter"]').text();

    expect(value).toContain('0');
  });

  test('should increase & decrease by 1 the counter', async () => {
    const [increaseButton, decreaseButton] = wrapper.findAll('button');

    await increaseButton.trigger('click');
    await increaseButton.trigger('click');
    await increaseButton.trigger('click');
    await decreaseButton.trigger('click');
    await decreaseButton.trigger('click');

    const value = wrapper.find('[data-testid="counter"]').text();

    expect(value).toBe('1');
  });

  test('should establish default value', () => {
    const { start } = wrapper.props();

    const value = wrapper.find('[data-testid="counter"]').text();

    expect(+value).toBe(start);
  });

  test('should show title prop', () => {
    const title = 'Test Counter';
    const wrapper = shallowMount(Counter, {
      props: {
        title,
      },
    });

    expect(wrapper.find('h2').text()).toBe(title);
  });
});
