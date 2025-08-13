const frontersDiv = document.getElementById('frontcheck');

async function fetchFronting() {
  try {
    const response = await fetch('https://moons-tools-frontcheck-production.up.railway.app/fronters');

    if (!response.ok) {
      throw new Error(`couldn't get front data: ${response.status}`);
    }

    const data = await response.json();
    const members = data.members;

    if (!frontersDiv) return;

    if (!members || members.length === 0) {
      frontersDiv.textContent = `Sorry, we haven't registered any fronters at this time!`;
    } else {
      const list = document.createElement('ul');
      list.style.listStyle = 'none';
      list.style.padding = '0';

      members.forEach(member => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.marginBottom = '0.5rem';

        const avatar = document.createElement('img');
        avatar.src = member.avatar || 'https://i.imgur.com/tfHP8dr.png';
        avatar.alt = member.name || 'Unknown';
        avatar.style.width = '25px';
        avatar.style.height = '25px';
        avatar.style.borderRadius = '50%';
        avatar.style.marginRight = '0.75rem';
        avatar.style.objectFit = 'cover';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = member.name || 'Unnamed';

        li.appendChild(avatar);
        li.appendChild(nameSpan);
        list.appendChild(li);
      });

      frontersDiv.innerHTML = '';
      frontersDiv.appendChild(list);
    }

  } catch (error) {
    console.error("couldn't get fronters:", error);
    if (frontersDiv) {
      if (error.message.includes('403')) {
        frontersDiv.textContent = `Sorry, we've made this private for now!`;
      } else {
        frontersDiv.textContent = `Sorry, there was an error!`;
      }
    }
  }
}

fetchFronting();
