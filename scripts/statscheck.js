// this script is under the MIT license (https://max.nekoweb.org/resources/license.txt)

(async () => {
  try {
    const request = await fetch(`https://nekoweb.org/api/site/info/helpimlostin.space`,);
    const json = await request.json();

    const updated = new Date(json.updated_at).toLocaleDateString(); // Formats Last Updated text
    const created = new Date(json.created_at).toLocaleDateString(); // Formats Creation Date text

    if (document.getElementById("created")) document.getElementById("created").innerHTML = `<strong>Created:</strong><br>${created}`;
    if (document.getElementById("updated")) document.getElementById("updated").innerHTML = `<strong>Updated:</strong><br>${updated}`;
    if (document.getElementById("visitors")) document.getElementById("visitors").innerHTML = `<strong>Visits:</strong><br>${json.views}`;
    if (document.getElementById("followers")) document.getElementById("followers").innerHTML = `<strong>Followers:</strong><br>${json.followers}`;
  } catch (error) {
    console.error(error);
    // If you wish to insert some fallback here, you may do so!
    console.log("mrow die")
  }
})();