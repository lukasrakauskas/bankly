import { render } from "@testing-library/react";
import { Loading } from ".";

test("should render as expected", () => {
  const { asFragment } = render(<Loading />);

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    Loading...
  </div>
</DocumentFragment>
`);
});
