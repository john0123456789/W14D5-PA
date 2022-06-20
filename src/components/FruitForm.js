import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'


const COLORS = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple"
];

function FruitForm({ fruits }) {
  const history = useHistory();

  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [sweetness, setSweetness] = useState(1);
  const [seeds, setSeeds] = useState("yes");
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    // mapping
    // const nameArray = fruits.map(fruit => fruit.name)
    // if (nameArray.includes(name)) errors.push("Name already exists.")

    if (name.length < 3) errors.push("Name must be 3 or more characters")
    if (name.length > 20) errors.push("Name must be 20 characters or less")
    if (sweetness < 1 || sweetness > 10) errors.push("Sweetness must be between 1 and 10")
    const uniqueName = fruits.find(fruit => fruit.name === name)
    if (uniqueName) errors.push("Name already exists.")
    setValidationErrors(errors);
  }, [name, sweetness])


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      color,
      sweetness,
      seeds
    })
    history.push('/')
  }

  return (
    <form
      className="fruit-form"
      onSubmit={handleSubmit}
    >
      <h2>Enter a Fruit</h2>
      {validationErrors.length > 0 && (
        <div>
          The following errors were found:
          <ul className="errors">
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Select a Color
        <select value={color} onChange={(e) => setColor(e.target.value)}
        >
          {COLORS.map(color => (
            <option
              key={color}
              value={color}
            >
              {color}
            </option>
          ))}
        </select>
      </label>
      <label>
        Sweetness
        <input
          type="number"
          name="sweetness"
          value={sweetness}
          onChange={(e) => setSweetness(e.target.value)}
        />
      </label>
      <label>
        <input
          type="radio"
          value="no"
          name="seeds"
          onChange={(e) => setSeeds(e.target.value)}
          checked={seeds==="no"}
        />
        No Seeds
      </label>
      <label>
        <input
          type="radio"
          value="yes"
          name="seeds"
          onChange={(e) => setSeeds(e.target.value)}
          checked={seeds==="yes"}
        />
        Seeds
      </label>
      <button
        type="submit"
        disabled={!!validationErrors.length}
      >
        Submit Fruit
      </button>
    </form>
  );
}

export default FruitForm;
