let tempSet = 200;
        let deviceStates = {};

        function openHelp() { document.getElementById('helpModal').style.display = 'block'; }
        function closeHelp() { document.getElementById('helpModal').style.display = 'none'; }

        async function fetchDeviceStatus() {
            const id = localStorage.getItem('tuya_id');
            if (!id) return toggleView(true);
            try {
                const response = await fetch('/api/control', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'getStatus', 
                        accessId: id, 
                        accessSecret: localStorage.getItem('tuya_secret'), 
                        deviceId: localStorage.getItem('tuya_device')
                    })
                });
                const data = await response.json();
                if (data.success) { 
                    updateUI(data.result); 
                    const now = new Date();
                    document.getElementById('sync-label').innerText = "Dernière synchro : " + now.toLocaleTimeString();
                    document.getElementById('status-msg').innerText = "Connecté au Cloud Tuya";
                }
            } catch (e) { document.getElementById('status-msg').innerText = "Erreur Cloud Tuya"; }
        }

        function updateUI(statusArray) {
            statusArray.forEach(item => {
                deviceStates[item.code] = item.value;
                
                // Températures
                if (item.code === 'temp_current') document.getElementById('room-val').innerText = "Sonde : " + (item.value / 10).toFixed(1) + "°C";
                if (item.code === 'temp_set') {
                    tempSet = item.value;
                    document.getElementById('set-val').innerText = (tempSet / 10).toFixed(1) + "°C";
                }

                // Modes & Power
                if (item.code === 'Power') {
    const badge = document.getElementById('power-badge');
    if (item.value === true) {
        badge.innerText = "● ALLUMÉ";
        badge.className = "badge-allume";
        badge.style.position = "absolute"; // Garde le badge en haut à gauche
        badge.style.top = "15px";
        badge.style.left = "20px";
        document.body.classList.remove('status-off');
    } else {
        badge.innerText = "○ ÉTEINT";
        badge.className = "badge-eteint";
        badge.style.position = "absolute";
        badge.style.top = "15px";
        badge.style.left = "20px";
        document.body.classList.add('status-off');
    }
}
                if (item.code === 'mode') {
                    document.querySelectorAll('[id^="mode-"]').forEach(b => b.classList.remove('btn-active'));
                    document.getElementById('mode-' + item.value)?.classList.add('btn-active');
                    document.body.className = item.value === 'cold' ? 'mode-cold' : (item.value === 'heat' ? 'mode-heat' : '');
                }

                // Ventilation
                if (item.code === 'windspeed') {
                    document.querySelectorAll('[id^="fan-"]').forEach(b => b.classList.remove('btn-active'));
                    document.getElementById('fan-' + item.value)?.classList.add('btn-active');
                }

                // Oscillations
                if (item.code === 'windshake') {
                    const shakeMap = { 'all':'shake-all', 'un_down':'shake-ud', 'left_right':'shake-lr', 'off':'shake-off' };
                    document.querySelectorAll('[id^="shake-"]').forEach(b => b.classList.remove('btn-active'));
                    document.getElementById(shakeMap[item.value])?.classList.add('btn-active');
                }

                // Menus déroulants (Vertical/Horizontal)
                if (item.code === 'vertical') document.getElementById('select-vert').value = item.value;
                if (item.code === 'horizontal') document.getElementById('select-horiz').value = item.value;

                // Stats
                if (item.code === 'electricity') document.getElementById('elec-val').innerText = (item.value / 10).toFixed(1) + " W";
                if (item.code === 'countdown_left') {
    const timerElem = document.getElementById('timer-val');
    // Si la valeur est 0 ou 1, on considère qu'il n'y a pas de minuteur actif
    if (item.value <= 1) {
        timerElem.innerText = "--"; 
    } else {
        timerElem.innerText = item.value;
    }
}
                if (item.code === 'total_time') {
    // Affiche "1 h 00" au lieu de juste "1" pour simuler la précision
    document.getElementById('total-time').innerText = item.value + " h 00";
}
                
                // Booleans (Options)
                const codeMap = { 'mode_ECO':'eco', 'light':'light', 'health':'health', 'sleep':'sleep', 'clean':'clean', 'heat8':'heat8' };
                const shortCode = codeMap[item.code];
                if (shortCode) {
                    const btn = document.getElementById('feat-' + shortCode);
                    if (btn) btn.classList.toggle('btn-active', item.value);
                }
            });
        }

        async function runCommand(code, value) {
            document.getElementById('status-msg').innerText = "Envoi commande...";
            try {
                const res = await fetch('/api/control', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        action: 'sendCommand', code: code, value: value,
                        accessId: localStorage.getItem('tuya_id'), accessSecret: localStorage.getItem('tuya_secret'), deviceId: localStorage.getItem('tuya_device')
                    })
                });
                const data = await res.json();
                if (data.success) { 
                    document.getElementById('status-msg').innerText = "Commande OK"; 
                    setTimeout(fetchDeviceStatus, 1000); 
                }
            } catch (e) { document.getElementById('status-msg').innerText = "Erreur envoi"; }
        }

        function toggleBool(code) { runCommand(code, !(deviceStates[code] || false)); }
        function adjustTemp(d) { 
            tempSet = Math.max(160, Math.min(320, tempSet + d)); 
            document.getElementById('set-val').innerText = (tempSet / 10).toFixed(1) + "°C";
            runCommand('temp_set', tempSet); 
        }
        function toggleView(s) { 
            document.getElementById('main-ui').style.display = s ? 'none' : 'block'; 
            document.getElementById('config-section').style.display = s ? 'block' : 'none'; 
        }
        function saveConfig() { 
            localStorage.setItem('tuya_id', document.getElementById('cfg-id').value); 
            localStorage.setItem('tuya_secret', document.getElementById('cfg-sec').value); 
            localStorage.setItem('tuya_device', document.getElementById('cfg-dev').value); 
            location.reload(); 
        }

        // INIT
        if (localStorage.getItem('tuya_id')) { 
            fetchDeviceStatus(); 
            setInterval(fetchDeviceStatus, 10000); // Rafraîchissement toutes les 10s
        } else { 
            toggleView(true); 
        }
