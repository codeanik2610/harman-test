import React, { useState, forwardRef } from "react";
import { MenuItem, H5 } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import "./style.css";
import PropTypes from "prop-types";
import omit from 'object.omit';

const CustomSelect = forwardRef((props, ref) => {
  const { label, data = [], activeItem = {}, setSelectedItem, searchNotFoundText = "Not Found" } = props;
  const _props = omit({ ...props }, ['data', 'activeItem', 'setSelectedItem', 'buttonConfig'])
  const [options, setOption] = useState();

  useState(() => {
    setOption(activeItem)
  }, [activeItem]);

  useState(() => {
    let finalData;
    if (data.length > 0) {
      finalData = data.map((m, index) => ({ ...m, rank: index + 1 }));
      setOption(finalData)
    }
  }, [options]);

  const handleValueChange = selectedOption => {
    setSelectedItem(selectedOption)
  };

  const handelRender = (data, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    const text = `${data.rank}. ${data.code}`;
    return (
      <MenuItem
        ref={ref}
        active={modifiers.active}
        disabled={modifiers.disabled}
        label={data.number.toString()}
        key={data.rank}
        onClick={handleClick}
        text={highlightText(text, query)}
      />
    );
  };

  const handleFilter = (query, data) => {
    return (
      `${
        data.rank
        }. ${data.code.toLowerCase()} ${data.number.toLowerCase()}`.indexOf(
          query.toLowerCase()
        ) >= 0
    );
  };

  function highlightText(text, query) {
    let lastIndex = 0;
    const words = query
      .split(/\s+/)
      .filter(word => word.length > 0)
      .map(escapeRegExpChars);
    if (words.length === 0) {
      return [text];
    }
    const regexp = new RegExp(words.join("|"), "gi");
    const tokens = [];
    while (true) {
      const match = regexp.exec(text);
      if (!match) {
        break;
      }
      const length = match[0].length;
      const before = text.slice(lastIndex, regexp.lastIndex - length);
      if (before.length > 0) {
        tokens.push(before);
      }
      lastIndex = regexp.lastIndex;
      tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
    }
    const rest = text.slice(lastIndex);
    if (rest.length > 0) {
      tokens.push(rest);
    }
    return tokens;
  }

  function escapeRegExpChars(text) {
    return text.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
  }

  return (
    <div className="tadig-label">
      {label && <H5>{label}</H5>}
      <Select
        ref={ref}
        fill
        items={options}
        itemPredicate={handleFilter}
        itemRenderer={handelRender}
        noResults={<MenuItem disabled={true} text={searchNotFoundText} />}
        onItemSelect={handleValueChange}
        {..._props}
      >
        {props.children}
      </Select>
    </div>
  )
})

CustomSelect.propTypes = {
  optionFormat: PropTypes.element.isRequired && PropTypes.array,
  setSelectedValue: PropTypes.func,
  data: PropTypes.element.isRequired && PropTypes.array,
  disabled: PropTypes.bool,
  filterable: PropTypes.bool,
  resetOnClose: PropTypes.bool,
  resetOnQuery: PropTypes.bool,
  resetOnSelect: PropTypes.bool,
  scrollToActiveItem: PropTypes.bool,
  searchNotFoundText: PropTypes.string
}
export default CustomSelect;
