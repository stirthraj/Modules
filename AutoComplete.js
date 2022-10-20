        <Autocomplete
          id="combo-box-demo"
          size="small"
          options={reportees}
          defaultValue={acValue}
          // ListboxProps={{ style: { maxHeight: '15rem' } }}
          getOptionLabel={(option) => option.FirstName + " " + option.LastName}
          onChange={setActiveReportee}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img loading="lazy" width="20" src={option.Photo} alt="" />
              {option.FirstName} {option.LastName}
            </Box>
          )}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField size="small" {...params} label="Team member" />
          )}
        />
