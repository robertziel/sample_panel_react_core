import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import waitForExpect from 'wait-for-expect';

export default function shouldDisableFormAfterSubmit(
  formComponentName,
  methods,
) {
  function checkButtonDisabled(wrapper, value) {
    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(value);
  }

  describe.each([
    ['when success', { status: 200 }],
    ['when failed', { throws: { message: 'FETCH_ERROR' } }],
  ])('%s', (a, response) => {
    loadApiFetchMock(response);

    it('should disable submit when waiting for response', () => {
      const wrapper = methods.configure();
      wrapper.find(formComponentName).instance().enable = () => {};
      methods.fillInAndSubmitForm();

      wrapper.update();
      checkButtonDisabled(wrapper, true);
    });

    it('should enable submit after response received', async () => {
      const wrapper = methods.configure();
      methods.fillInAndSubmitForm();

      await waitForExpect(() => {
        wrapper.update();
        checkButtonDisabled(wrapper, false);
      });
    });
  });
}
