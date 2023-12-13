using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodeFlow.Models;

namespace CodeFlow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntriesController : ControllerBase
    {
        private readonly EntrieContext _context;

        public EntriesController(EntrieContext context)
        {
            _context = context;
        }

        // GET: api/Entries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entrie>>> GetEntrieItems()
        {
            return await _context.EntrieItems.ToListAsync();
        }

        // GET: api/Entries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Entrie>> GetEntrie(long id)
        {
            var entrie = await _context.EntrieItems.FindAsync(id);

            if (entrie == null)
            {
                return NotFound();
            }

            return entrie;
        }

        // PUT: api/Entries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntrie(long id, Entrie entrie)
        {
            if (id != entrie.Id)
            {
                return BadRequest();
            }

            _context.Entry(entrie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntrieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Entries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Entrie>> PostEntrie(Entrie entrie)
        {
            _context.EntrieItems.Add(entrie);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEntrie), new { id = entrie.Id }, entrie);
        }

        // DELETE: api/Entries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntrie(long id)
        {
            var entrie = await _context.EntrieItems.FindAsync(id);
            if (entrie == null)
            {
                return NotFound();
            }

            _context.EntrieItems.Remove(entrie);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EntrieExists(long id)
        {
            return _context.EntrieItems.Any(e => e.Id == id);
        }
    }
}
