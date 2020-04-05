import React, { useState, createRef } from "react";
import "./style.css";
import CustomSelect from "../Components/CustomSelect";
import { Card, Elevation, } from "@blueprintjs/core";
import { Button } from "@blueprintjs/core";

const Home = () => {
  const data = [
    { code: "GBRVF", number: "UK" },
    { code: "GBRO2", number: "UK" },
    { code: "AAZVF", number: "UK" },
    { code: "DEO2", number: "DE" }
  ];
  const [selectOptions, setSelectOptions] = useState(data);
  const [activeItem, setActiveItem] = useState({ code: "DEO2", number: "DE" });
  const setSelectedItemCb = (e) => {
    setActiveItem(e);
  }
  const ref = createRef();
  return (
    <>
      <div className="row pb-3 pt-3">
        <div className="col-3">
          <Card interactive={false} elevation={Elevation.TWO}>
            <CustomSelect
              ref={ref}
              label="Disabled"
              data={selectOptions}
              activeItem={activeItem}
              setSelectedItem={setSelectedItemCb}
              disabled={true}
              searchNotFoundText="Result Not Found"
              initialContent={"text"}
            >
              <Button
                icon="film"
                rightIcon="caret-down"
                text={activeItem.code}
              />
            </CustomSelect>
          </Card>
        </div>
        <div className="col-3">
          <Card interactive={false} elevation={Elevation.TWO}>
            <CustomSelect
              label="Filter Enabled Demo"
              data={selectOptions}
              activeItem={activeItem}
              setSelectedItem={setSelectedItemCb}
              filterable={false}>
              <Button
                icon="film"
                rightIcon="caret-down"
                text={activeItem.code}
              />
            </CustomSelect>
          </Card>
        </div>
        <div className="col-3">
          <Card interactive={false} elevation={Elevation.TWO}>
            <CustomSelect
              label="Filter Enabled Demo"
              data={selectOptions}
              activeItem={activeItem}
              setSelectedItem={setSelectedItemCb}
              disabled={false}
              filterable={true}
              searchNotFoundText="Result Not Found" >
              <Button
                icon="film"
                rightIcon="caret-down"
                text={activeItem.code}
              />
            </CustomSelect>
          </Card>
        </div>
        <div className="col-3">
          <Card interactive={false} elevation={Elevation.TWO}>
            <CustomSelect
              label="Reset On Close Demo"
              data={selectOptions}
              activeItem={activeItem}
              setSelectedItem={setSelectedItemCb}
              resetOnClose={true} >
              <Button
                icon="film"
                rightIcon="caret-down"
                text={activeItem.code}
              />
            </CustomSelect>
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <Card interactive={false} elevation={Elevation.TWO}>
            <CustomSelect
              label="Reset On Query"
              data={selectOptions}
              activeItem={activeItem}
              setSelectedItem={setSelectedItemCb}
              resetOnQuery={true} >
              <Button
                icon="film"
                rightIcon="caret-down"
                text={activeItem.code}
              />
            </CustomSelect>
          </Card>
        </div>
        <div className="col-3">
          <Card interactive={false} elevation={Elevation.TWO}>
            <CustomSelect
              label="Reset On Select"
              data={selectOptions}
              activeItem={activeItem}
              setSelectedItem={setSelectedItemCb}
              resetOnSelect={true} >
              <Button
                icon="film"
                rightIcon="caret-down"
                text={activeItem.code}
              />
            </CustomSelect>
          </Card>
        </div>
        <div className="col-3">
          <Card interactive={false} elevation={Elevation.TWO}>
            <CustomSelect
              label="Use Initial Content"
              data={selectOptions}
              activeItem={activeItem}
              setSelectedItem={setSelectedItemCb}
              hasInitialContent={true}
              filterable={false}
              initialContent={`${data.length} records selected`}
            >
              <Button
                icon="film"
                rightIcon="caret-down"
                text={activeItem.code}
              />
            </CustomSelect>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home;
