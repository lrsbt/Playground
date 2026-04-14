import classNames from "classNames";
import { useState } from "react";

type Option = { name: string; value: string };

interface Props {
  options: Option[];
}

const Dropdown = ({ options }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(options[0]);

  const classNameSelect = classNames("choices", { "is-open": isOpen });
  const classNameChoices = classNames("choices__list choices__list--dropdown", {
    "is-active": isOpen,
  });

  const handleOpen = () => setIsOpen((v) => !v);
  const selectValue = (v: Option) => setSelected(v);

  return (
    <div className="DropdownSelector">
      <div className="Select">
        <label className="sr-only">
          Choose the option that best suits your request.
        </label>
        <div
          className={classNameSelect}
          data-type="select-one"
          role="listbox"
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded={isOpen}
          dir="ltr"
          onClick={handleOpen}
        >
          <div className="choices__inner">
            {/* Fallback */}
            {/* <select
              id="selection"
              className="js-select choices__input is-hidden"
              name="selection"
              aria-controls="dropdownSelection"
              tabIndex={-1}
              aria-hidden="true"
              data-choice="active"
            >
              <option value="default" selected="">
                Event enquiry
              </option>
            </select> */}
            <div className="choices__list choices__list--single">
              <div
                className="choices__item choices__item--selectable"
                data-item=""
                data-id="1"
                data-value="default"
                aria-selected="true"
              >
                {selected?.name}
              </div>
            </div>
          </div>
          <div className={classNameChoices} aria-expanded={isOpen}>
            <div className="choices__list" dir="ltr" role="listbox">
              {options.map((option) => (
                <div
                  key={option.name}
                  className="choices__item choices__item--choice choices__item--selectable"
                  data-select-text="Press to select"
                  data-choice=""
                  data-id="1"
                  data-value={option.value}
                  data-choice-selectable=""
                  id="choices--selection-item-choice-1"
                  role="option"
                  aria-selected="true"
                  onClick={() => selectValue(option)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="dropdownSelection" role="region" aria-live="polite">
        <div
          className="DropdownSelection__result DropdownSelection__result--visible"
          data-item="default"
          aria-hidden="false"
        >
          <div className="block-rich_text">
            <div className="rich-text">
              <p>
                If you’d like to find out more about events at Here East, get in
                touch.
              </p>
            </div>
          </div>
          <div className="block-rich_text">
            <div className="rich-text">
              <p>
                If you don’t hear from a member of the team right away, not to
                worry, we’ll get back to you within 72 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dropdown };
